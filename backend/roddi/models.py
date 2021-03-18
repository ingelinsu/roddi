from django.db import models, migrations
from django.core.validators import MaxValueValidator, MinValueValidator
import cvxopt
from cvxopt.glpk import ilp
import numpy as np


RELATION_WEIGHTS = {
        'child': 1,
        'parent': 0.8,
        'sibling': 0.7,
        'grandchildren': 0.6,
        'grandparent': 0.4,
        'pibling': 0.15,
        'other': 0.1
}

RELATION_CHOICES = [
    ('sibling', 'Sibling'),
    ('parent', 'Parent'),
    ('pibling', 'Uncle/Aunt'),
    ('grandparent', 'Grandparent'),
    ('child', 'Child'),
    ('grandchild', 'Grandchild'),
    ('other', 'Other')
]
    

class Comment(models.Model):


    def _get_id():
        """
        Function for generating ids for all new comments
        """
        return len(Comment.objects.all())

    id = models.IntegerField(primary_key=True, editable=False, default=_get_id)
    submitter = models.ForeignKey('User', on_delete=models.CASCADE)
    text = models.CharField(max_length=120, default='')
    timestamp = models.DateTimeField(auto_now_add=True)
    is_deleted = models.BooleanField(default=False)
    

    def __str__(self):
        return self.text


class Asset(models.Model):


    def _get_id():
        """
        Function for generating ids for all new assets
        """
        return len(Asset.objects.all())

    id = models.IntegerField(primary_key=True, editable=False, default=_get_id)
    name = models.CharField(max_length=120, default='')
    description = models.TextField(blank=True, default='')
    image_url = models.CharField(max_length=120, blank=True, default='')
    category = models.CharField(max_length=120, default='')
    to_be_distributed = models.BooleanField(default=True)
    to_be_thrown = models.BooleanField(default=False)
    to_be_donated = models.BooleanField(default=False)
    is_processed = models.BooleanField(default=False)
    belongs_to = models.ForeignKey('User', null=True, blank=True, on_delete=models.SET_NULL)
    comments = models.ManyToManyField(Comment, blank=True)

    distribute_votes = models.ManyToManyField('User', blank=True, related_name='distribute_votes')
    throw_votes = models.ManyToManyField('User', blank=True, related_name='throw_votes')
    donate_votes = models.ManyToManyField('User', blank=True, related_name='donate_votes')


    def modify(self, param: str, new_value):
        pass


    def comment(self, user, text: str):
        self.comments.create(text=text, submitter=user)


    def vote(self, user, vote):
        '''
        Add or change vote on action for asset. vote should be 'withdraw' if the user want to withdraw his/her vote
        '''

        if vote not in ['distribute', 'donate', 'throw', 'withdraw']:
            return None

        if self.distribute_votes.filter(id=user.id).exists():
            self.distribute_votes.remove(user)
        elif self.throw_votes.filter(id=user.id).exists():
            self.throw_votes.remove(user)
        elif self.donate_votes.filter(id=user.id).exists():
            self.donate_votes.remove(user)

        if vote == 'distribute':
            self.distribute_votes.add(user)
        elif vote == 'throw':
            self.throw_votes.add(user)
        elif vote == 'donate':
            self.donate_votes.add(user)

        self.to_be_distributed = False
        self.to_be_donated = False
        self.to_be_thrown = False

        # Set to_be_distributed=True if anyone voted distribute, or if there are no votes
        if (self.distribute_votes.count() > 0) or (self.donate_votes.count() + self.throw_votes.count() == 0): 
            self.to_be_distributed = True

        # Settle between donate and throw using majority. A tie results in donation, no votes results in throwing away
        elif self.donate_votes.count() >= self.throw_votes.count():
            self.to_be_donated = True
        else:
            self.to_be_thrown = True
        self.save()


    def donate(self):
        self.to_be_donated = True


    def throw_out(self):
        self.to_be_thrown = True


    def process(self):
        self.is_processed = True


    def __str__(self):
        return self.name



class User(models.Model):


    def _get_id():
        """
        Function for generating ids for all new users
        """
        return len(User.objects.all())

    id = models.IntegerField(primary_key=True, editable=False, default=_get_id)
    name = models.CharField(max_length=120, default='')
    email = models.EmailField(default='')
    password = models.CharField(max_length=120, default='')
    age = models.IntegerField(
        validators=[
                        MaxValueValidator(150),
                        MinValueValidator(18)
        ]
    )

    relation_to_dead = models.ManyToManyField('Estate', through='Relation', related_name="relation_to_dead")
    wish_list = models.ManyToManyField(Asset, through='Wish', related_name="wish_list")
    obtained_assets = models.ManyToManyField(Asset, blank=True)
    latest_login = models.DateTimeField(auto_now_add=True)
    comments = models.ManyToManyField(Comment, blank=True)

    def modify(param: str, new_value):
        pass


    def __str__(self):
        return self.name

    def reprioritize(self, asset, priority):
        wishes = Wish.objects.filter(user=self)
        if asset in self.wish_list.all():
            asset_wish = wishes.filter(asset=asset)[0]
            if priority > asset_wish.priority:
                to_move_up = wishes.filter(priority__gt=asset_wish.priority).filter(priority__lte=priority)
                for wish in to_move_up:
                    wish.priority = wish.priority - 1
                    wish.save()
            else:
                to_move_down = wishes.filter(priority__lt=asset_wish.priority).filter(priority__gte=priority)
                for wish in to_move_down:
                    wish.priority = wish.priority + 1
                    wish.save()
            asset_wish.priority = priority
        else:
            to_move_down = wishes.filter(priority__gte=priority)
            for wish in to_move_down:
                wish.priority = wish.priority + 1
                wish.save()
            asset_wish = Wish.objects.create(user=self, asset=asset, priority=priority)
        asset_wish.save()
        self.save()
        return asset_wish

    def get_ordered_wishlist(self):
        return [wish.asset for wish in Wish.objects.filter(user=self).order_by('priority')]


class Wish(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    asset = models.ForeignKey(Asset, on_delete=models.CASCADE)
    priority = models.IntegerField(
        validators=[
                        MinValueValidator(1)
        ]
    )

    
    def __str__(self):
        return f'{self.user}: {self.asset} ({self.priority})'


class Relation(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    estate = models.ForeignKey('Estate', on_delete=models.CASCADE)
    relation = models.CharField(max_length=120, choices=RELATION_CHOICES, default='other')
    
    
    def __str__(self):
        return f'{self.user}: {self.relation} in ({self.estate})'


class Estate(models.Model):


    def _get_id():
        """
        Function for generating ids for all new estates
        """
        return len(Estate.objects.all())

    id = models.IntegerField(primary_key=True, editable=False, default=_get_id)
    name = models.CharField(max_length=120)
    description = models.TextField(blank=True, default='')
    # administrator = models.ForeignKey('User', on_delete=models.SET_NULL)
    users = models.ManyToManyField(User, blank=True)
    assets = models.ManyToManyField(Asset, blank=True)
    approvals = models.ManyToManyField(User, related_name="approvals", blank=True)
    is_complete = models.BooleanField(default=False)


    def add_user(self, user: User):
        self.users.add(user)


    def remove_user(self, user: User):
        self.users.remove(user)


    def add_asset(self, asset: Asset):
        self.assets.add(asset)


    def remove_asset(self, asset: Asset):
        self.assets.remove(asset)


    def approve(self, user: User):
        self.approvals.add(user)
        if len(self.approvals) == len(self.users):
            full_distribution()


    def full_distribution(self):
        """
        Distribute all assets with to_be_distributed=True

        We define the problem as an integer linear program on the form

            minimize    c*x
            subject to  G*x <= h
                        x is binary vector
        """

        assets = [a for a in self.assets.all() if a.to_be_distributed]
        asset_ids = [a.id for a in assets]
        relations = [Relation.objects.all().get(user=u, estate=self).relation for u in self.users.all()]
        wishlists = [[a.id for a in u.get_ordered_wishlist() if a.id in asset_ids] for u in self.users.all()]

        # List of numbers representing priorities. [[1, 0, 2], ...] means that the first user wants asset nr 2 the most, then asset nr 1, then asset nr 3
        indexed_wishlists = [[asset_ids.index(asset_id) for asset_id in wishlist] for wishlist in wishlists]

        # One-dimensional list with negative priorities. indexed_wishlists = [[1, 0, 2], ...] would give wish_hstack = [-2, -3, -1, ...]
        wish_hstack = np.hstack(indexed_wishlists) - len(assets)

        # c defines the minimization function. We want to minimize the sum of products on the form negative_asset_priority * relation_weight for every asset-user-pair selected in the final matching
        c = np.array([wish_hstack[i] * RELATION_WEIGHTS[relations[i//len(assets)]] for i in range(len(wish_hstack))])

        # G is a matrix which, when multiplied by x, is less than h. We want the sum of all binary x-values for each asset to be less than one
        max_one_user_per_asset = [[1 if (i-j) % len(assets) == 0 else 0 for i in range(len(c))] for j in range(len(assets))]
        max_one_user_per_asset_sum = [1] * len(assets)

        # We measure the 'satisfaction' a pairing gives to a user as the sum of negative priorities for each asset he/she gets in the distribution. Smaller is better
        # Here, we define a rule saying each user deserves a satisfaction less than the sum of their negative priorities divided by the number of users.
        # We also multiply with a weight_factor, so that uncles and grandparents deserves less 'satisfaction' than children and siblings, etc.
        fair_distribution = [[wish_hstack[i] if len(assets) * j <= i < len(assets) * (j+1) else 0 for i in range(len(wish_hstack))] for j in range(len(self.users.all()))]
        weight_factor = 1 / max(RELATION_WEIGHTS[relation] for relation in relations)
        fair_distribution_sum = [c[:len(assets)].sum() * RELATION_WEIGHTS[relation] * weight_factor / len(self.users.all()) for relation in relations]

        # Concatenate the requirements to arrays G and h
        G = np.array(max_one_user_per_asset + fair_distribution)
        h = np.array(max_one_user_per_asset_sum + fair_distribution_sum)

        # Solve using mixed integer linear programming solver
        solution = ilp(c=cvxopt.matrix(c, tc='d'),
                                     G=cvxopt.matrix(G, tc='d'),
                                     h=cvxopt.matrix(h, tc='d'),
                                     B=set(range(len(c))))

        # One-dimensional binary solution array. The first len(assets) values indicate which assets belongs to user 1, the next len(assets) indicate which assets belongs to user 2, and so on
        opt = np.array(list(solution[1]))

        # Do the actual distribution based on the opt array
        for i in range(len(opt)):
            if opt[i] == 1:
                asset_index = i % len(assets)
                user_index = i // len(assets)
                self.users.all()[user_index].obtained_assets.add(assets[asset_index])
                assets[asset_index].belongs_to = self.users.all()[user_index]
                assets[asset_index].process()
                assets[asset_index].to_be_distributed = False
                assets[asset_index].save()

        self.is_complete = True
        


    def alert_distribution(self):
        pass


    def __str__(self):
        return self.name