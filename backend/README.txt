API


/api/

/api/assets
/api/users
/api/estates
/api/comments
/api/estate-assets
/api/user-estates

GET /api/vote/USER&ASSET&VOTE

    USER  INT id
    ASSET ITN id
    VOTE  TXT in {"distribute", "throw", "donate"}

Returns nothing(204). Applies modification to the schema
which casts a vote for the user on the specific asset as
specified.


GET /api/reprioritize

Send some json with the put that indicates user, asset
and new priority. This might get changed later to use
GET like the other API functions that modify database.


GET /api/login/EMAIL&PASSWORD'



/api/register/<str:name>&<str:pw>&<int:age>', views.register_view, name='register'),
