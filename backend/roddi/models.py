from django.db import models
import cvxopt
from cvxopt.glpk import ilp


class Comment(models.Model):
  submitter = models.ForeignKey('User', on_delete=models.CASCADE)
  text = models.CharField(max_length=120, default='')
  timestamp = models.DateTimeField(auto_now_add=True)
  is_deleted = models.BooleanField(default=False)
  

  def _str_(self):
    return self.text


class Asset(models.Model):
  id = models.IntegerField(default=lambda: Asset.objects.latest('id').id + 1)
  name = models.CharField(max_length=120, default='')
  description = models.TextField(default='')
  image_url = models.CharField(max_length=120, default='')
  category = models.CharField(max_length=120, default='')
  to_be_distributed = models.BooleanField(default=True)
  to_be_thrown = models.BooleanField(default=False)
  to_be_donated = models.BooleanField(default=False)
  is_processed = models.BooleanField(default=False)
  belongs_to = models.ForeignKey('User', on_delete=models.SET_NULL)
  comments = models.ManyToManyField(Comment)


  def modify(self, param: str, new_value):
    pass


  def comment(self, user, text: str):
    self.comments.create(text=text, submitter=user)


  def donate(self):
    self.to_be_donated = True


  def throw_out(self):
    self.to_be_thrown_out = True


  def process(self):
    self.is_processed = True


  def _str_(self):
    return self.name



class User(models.Model):
  name = models.CharField(max_length=120, default='')
  email = models.EmailField(default='')
  age = models.IntegerField()
  relation_to_dead = models.CharField(max_length=120, default='')
  wish_list = models.ManyToManyField(Asset, related_name="wish_list")
  obtained_assets = models.ManyToManyField(Asset)
  latest_login = models.DateTimeField(auto_now_add=True)
  comments = models.ManyToManyField(Comment)

  def modify(param: str, new_value):
    pass


  def _str_(self):
    return self.name


class Estate(models.Model):
  name = models.CharField(max_length=120)
  description = models.TextField(default='')
  # administrator = models.ForeignKey('User', on_delete=models.SET_NULL)
  users = models.ManyToManyField(User)
  assets = models.ManyToManyField(Asset)
  approvals = models.ManyToManyField(User, related_name="approvals")
  is_complete = False


  def add_user(self, user: User):
    self.users.add(user)


  def remove_user(self, user: User):
    self.users.remove(user)


  def add_asset(self, asset: Asset):
    self.assets.add(asset)


  def remove_asset(self, asset: Asset):
    self.assets.remove(user)


  def approve(self, user: User):
    self.approvals.add(user)
    if len(self.approvals) == len(self.users):
      full_distribution()


  def full_distribution(self):
    assets = [a for a in self.assets.all() if a.to_be_distributed]
    asset_ids = [a.id for a in assets]
    wislists = [[a.id for a in u.wish_list if a.id in asset_ids] for u in self.users.all()]
    indexed_wishlists = [[asset_ids.index(asset_id) for asset_id in wishlist] for wishlist in wishlists]

    c = np.hstack(indexed_wishlists) - len(assets)

    max_one_user_per_asset = [[1 if (i-j) % len(assets) == 0 else 0 for i in range(len(c))] for j in range(len(assets))]
    fair_distribution = [[c[i] if len(assets) * j <= i < len(assets) * (j+1) else 0 for i in range(len(c))] for j in range(len(users))]
    A = np.array(max_one_user_per_asset + fair_distribution)

    max_one_user_per_asset_sum = [1] * len(assets)
    fair_distribution_sum = [c[:len(assets)].sum() / len(users)] * len(users)
    b = np.array(max_one_user_per_asset_sum + fair_distribution_sum)

    solution = ilp(c=cvxopt.matrix(c, tc='d'),
                   G=cvxopt.matrix(A, tc='d'),
                   h=cvxopt.matrix(b, tc='d'),
                   B=set(range(len(c))))

    opt = np.array(list(solution[1]))

    for i in range(len(opt)):
      if opt[i] == 1:
        self.users.all()[i].obtained_assets.add(assets[i])
        assets[i].belongs_to = self.users.all()[i]
    self.is_complete = True
    


  def alert_distribution(self):
    pass


  def _str_(self):
    return self.name


