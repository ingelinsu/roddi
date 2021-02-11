from roddi.models import *

def delete_all_data():
    Asset.objects.all().delete()
    User.objects.all().delete()
    Estate.objects.all().delete()
    Comment.objects.all().delete()
    Wish.objects.all().delete()


def create_users():
    users = [
        User.objects.create(name='Daniel', email='daniefs@stud.ntnu.no', age=20, relation_to_dead='pibling'),
        User.objects.create(name='Philip', email='philiped@stud.ntnu.no', age=20, relation_to_dead='sibling'),
        User.objects.create(name='Steffen', email='steffeah@stud.ntnu.no', age=20, relation_to_dead='parent')
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
    wishes = [
        [
            Wish.objects.create(user=user, asset=assets[i], priority=priorities[i])
            for i in range(len(assets))
            if (priorities := np.random.permutation(len(assets)) + 1) is not None
        ]
        for user in users
    ]

    for wishlist in wishes:
        for wish in wishlist:
            wish.save()
    return wishes


def main():
    delete_data()
    users = create_users()
    assets = create_assets()
    create_estate(users, assets)
    create_wishes(users, assets)


if __name__ == '__main__':
    main()
