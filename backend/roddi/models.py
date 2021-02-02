from django.db import models


class Comment(models.Model):
  submitter = models.ForeignKey('User', on_delete=models.CASCADE)
  text = models.CharField(max_length=120, default='')
  timestamp = models.DateTimeField(auto_now_add=True)
  is_deleted = models.BooleanField(default=False)
  

  def _str_(self):
    return self.text


class ObtainedAsset(models.Model):
  asset = models.ForeignKey('Asset', on_delete=models.CASCADE)
  percentage = models.FloatField(default=100)


  def _str_(self):
    return self.asset._str_ + percentage + '%'



class SingleDistribution(models.Model):
  user = models.ForeignKey('User', on_delete=models.CASCADE)
  percentage = models.FloatField(default=100)


  def _str_(self):
    return self.user._str_ + percentage + '%'



class Asset(models.Model):
  name = models.CharField(max_length=120, default='')
  description = models.TextField(default='')
  image_url = models.CharField(max_length=120, default='')
  category = models.CharField(max_length=120, default='')
  to_be_distributed = models.BooleanField(default=True)
  to_be_thrown = models.BooleanField(default=False)
  to_be_donated = models.BooleanField(default=False)
  is_processed = models.BooleanField(default=False)
  distribution = models.ManyToManyField(SingleDistribution)
  comments = models.ManyToManyField(Comment)


  def modify(self, param: str, new_value):
    pass


  def comment(self, user, text: str):
    self.comments.create(text=text, submitter=user)


  def single_distribute(self, single_distribution: SingleDistribution):
    self.distribution.add(single_distribution)
    self.to_be_distributed = True


  def full_distribute(self, distribution):
    self.distribution = distribution
    self.to_be_distributed = True


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
  wish_list = models.ManyToManyField(Asset)
  obtained_assets = models.ManyToManyField(ObtainedAsset)
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


  def full_distribution(self):
    pass


  def alert_distribution(self):
    pass


  def _str_(self):
    return self.name


