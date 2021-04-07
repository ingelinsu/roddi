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
        Asset.objects.create(
            name='Vase', 
            description='Lyngby vase Copenhagen green matt',
            image_url='https://www.nordicnest.com/4af0b3/globalassets/product-pictures/lyngby-porslin/p_28517-03-01.jpg?width=1200',
            category='Interiør'),
        
        Asset.objects.create(
            name='Klokke', 
            description='Veldig gammeldags klokke av 2 karats gull',
            image_url='https://upload.wikimedia.org/wikipedia/commons/4/45/MontreGousset001.jpg',
            category='Klær'),
        
        Asset.objects.create(
            name='Samsung galaxy S3', 
            description='Smarttelefon med dårlig batteri, men skjerm er fin',
            image_url='https://upload.wikimedia.org/wikipedia/commons/5/56/Samsung_Galaxy_S_III_Screen_Area.jpg',
            category='Elektronikk'),

        Asset.objects.create(
            name='Apple-TV', 
            description='Enkel måte å streame uten bruk av smart-TV, chromecast eller pc',
            image_url='https://tellit.no/media/catalog/product/cache/9eb4653ca5ff6052e6cee07158103f29/m/g/mgnt3-apple-mac-mini-m1-2.jpg',
            category='Elektronikk'),
        
        Asset.objects.create(
            name='Blå t-skjorte', 
            description='100% ull, veldig godt stoff',
            image_url='https://cdn-images.farfetch-contents.com/14/66/46/09/14664609_23855407_1000.jpg',
            category='Klær'),
        
        Asset.objects.create(
            name='Gressklipper', 
            description='Enkel å bruke, liten kapasitet',
            image_url='https://www.jula.no/globalassets/catalog/productimages/721396.jpg?width=458&height=458&scale=both&bgcolor=white',
            category='Hageutstyr')

    ]

    for asset in assets:
        asset.save()
    return assets


def create_estate(users, assets):
    estate1 = Estate.objects.create(name='Hans Hansens Dødsbo', is_complete=False)
    estate1.users.add(users[0])
    estate1.users.add(users[1])
    estate1.assets.add(*assets)

    estate2 = Estate.objects.create(name='Martin Johnsens Dødsbo', is_complete=False)
    estate2.users.add(users[2])

    estates = [estate1, estate2]

    for estate in estates:
        estate.save()
    return estates


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


def create_relations(users, estates):
    relation_names = ['pibling', 'sibling', 'parent']
    relations = [Relation.objects.create(user=users[i], estate=estates[j], relation=relation_names[i]) for i in range(len(users)) for j in range(len(estates))]
    for relation in relations:
        relation.save()
    return relations



def main():
    delete_all_data()
    users = create_users()
    assets = create_assets()
    estates = create_estate(users, assets)
    create_wishes(users, assets)
    create_relations(users, estates)


if __name__ == '__main__':
    main()
