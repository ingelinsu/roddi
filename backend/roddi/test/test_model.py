from django.test import TestCase
from roddi.models import *
from roddi.test import setup_test_data

#Tests methods in the model page of the project with a test database

class TestModels(TestCase):

    def setUp(self):
        setup_test_data.main()
 

    def test_reprioritize_method(self):
        daniel = User.objects.all()[0]
        wishes = Wish.objects.filter(user=daniel)

        vase = wishes[0].asset
        priority = 4

        daniel.reprioritize(vase, priority)
        daniel.reprioritize(vase, 1)
        self.assertEquals(wishes[0].priority, 1)

        giraffe = Asset.objects.create(name='Giraffe', category='husdyr')
        daniel.reprioritize(giraffe, 3)
        self.assertEquals(wishes[6].priority, 3)

    def test_user_comment(self):
        daniel = User.objects.all()[0]
        vase = Asset.objects.all()[0]
        vase.comment(daniel, 'virus')
        kommentar = Comment.objects.all()[0]
        self.assertEqual(kommentar.text, 'virus')

    def test_distrib_alg(self): 
        daniel = User.objects.all()[0]
        steffen = User.objects.all()[2]
        Estate.objects.all()[0].full_distribution()

        daniel_assets = daniel.obtained_assets.all()
        steffen_assets = steffen.obtained_assets.all()

        self.assertGreater(2,len(daniel_assets)) 
        self.assertGreater(5,len(steffen_assets))
        self.assertEqual(daniel_assets[0].to_be_distributed, False)
        self.assertEqual(daniel_assets[0].is_processed, True)

    def test_donate_asset(self):
        vase = Asset.objects.all()[0]
        vase.donate()
        self.assertEqual(vase.to_be_donated, True)

    def test_thrash_asset(self):
        vase = Asset.objects.all()[0]
        vase.throw_out()
        self.assertEqual(vase.to_be_thrown, True)
    
    
        


       