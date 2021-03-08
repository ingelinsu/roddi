from django.test import SimpleTestCase
from django.urls import reverse, resolve
from roddi.views import AssetView, EstateView, CommentView, UserView, login

#Tests the current URLS and that they are connected to the correct views

class TestUrls(SimpleTestCase):
    def test_loginView_url_resolved(self):
        url = reverse('login', args=["email", "passord"])
        self.assertEquals(resolve(url).func, login)

    def test_api_asset_url_resolved(self):
        url = reverse('asset-list')
        self.assertEquals(resolve(url).func.cls, AssetView)

    def test_api_user_url_resolved(self):
        url = reverse('user-list')
        self.assertEquals(resolve(url).func.cls, UserView)
    
    def test_api_estate_url_resolved(self):
        url = reverse('estate-list')
        self.assertEquals(resolve(url).func.cls, EstateView)

    def test_api_comment_url_resolved(self):
        url = reverse('comment-list')
        self.assertEquals(resolve(url).func.cls, CommentView)