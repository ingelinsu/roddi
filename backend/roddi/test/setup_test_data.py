from roddi.models import *

def delete_all_data():
    Asset.objects.all().delete()
    User.objects.all().delete()
    Estate.objects.all().delete()
    Comment.objects.all().delete()
    Wish.objects.all().delete()


def create_users():
    users = [
        User.objects.create(name='Daniel', email='daniefs@stud.ntnu.no', password='passord123', age=20),
        User.objects.create(name='Philip', email='philiped@stud.ntnu.no', password='passord123', age=20),
        User.objects.create(name='Steffen', email='steffeah@stud.ntnu.no', password='passord123', age=20)
    ]

    for user in users:
        user.save()
    return users


def create_assets():
    assets = [
        Asset.objects.create(name='Vase', category='interiør'),
        Asset.objects.create(name='Maleri', category='kunst'),
        Asset.objects.create(name='Gevær', category='våpen'),
        Asset.objects.create(name='Bord', category='møbler'),
        Asset.objects.create(name='Stol', category='møbler'),
        Asset.objects.create(name='PC', category='elektronikk')
    ]

    for asset in assets:
        asset.save()
    return assets


def create_estate(users, assets):
    estate = Estate.objects.create(name='Hans Hansens dødsbo', is_complete=False)
    estate.save()
    estate.users.add(*users)
    estate.assets.add(*assets)
    return estate


def create_wishes(users, assets):
    priorities_lists = [np.random.permutation(len(assets)) for i in range(len(users))]
    wishes = [
        [
            Wish.objects.create(user=users[j], asset=assets[i], priority=priorities_lists[j][i])
            for i in range(len(assets))
        ]
        for j in range(len(users))
    ]

    for wishlist in wishes:
        for wish in wishlist:
            wish.save()
    return wishes


def create_relations(users, estate):
    relation_names = ['pibling', 'sibling', 'parent']
    relations = [Relation.objects.create(user=users[i], estate=estate, relation=relation_names[i]) for i in range(len(users))]
    for relation in relations:
        relation.save()
    return relations


def main():
    delete_all_data()
    users = create_users()
    assets = create_assets()
    estate = create_estate(users, assets)
    create_wishes(users, assets)
    create_relations(users, estate)


if __name__ == '__main__':
    main()
