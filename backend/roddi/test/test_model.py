from django.test import TestCase
from roddi.models import Comment, Asset, Estate, User, Wish

class TestModels(TestCase):

    def setUp(self):
        self.user1 = User.objects.create(
            id = 1,
            name = 'tom',
            email = 'tom@hotmail.com',
            age = 50,
            relation_to_dead = 'parent',
            #'obtained_assets',
            latest_login = 2021-3-30,
            #'comments'
        )
        self.asset1 = Asset.objects.create(
            id = 1,
            name = "vase",
            description = "dette er en gamme kinesisk vase",
            image_url = '',
            category = 'dekorasjon'
        )

    def 

     