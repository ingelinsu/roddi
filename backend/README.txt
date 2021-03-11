API Reference
=============

GET /api/assets
GET /api/users
GET /api/estates
GET /api/comments
GET /api/estate-assets
GET /api/user-estates



GET /api/estate-assets/ESTATE
    ESTATE  INT id

Gets a list of the assets in an estate.


GET /api/user-estates/USER
    USER    INT id

Get a list of the users in an estate.


GET /api/vote/USER&ASSET&VOTE

    USER  INT id
    ASSET INT id
    VOTE  TXT in {"distribute", "throw", "donate"}

Adds a vote for the user on the specified asset.


GET /api/reprioritize/USER/ASSET/PRIO

    USER  INT id
    ASSET INT id
    PRIO  INT

Reprioritizes the users wishlist by assigning a new
priority to the given asset.


GET /api/login/EMAIL&PASSWORD

    EMAIL       STR
    PASSWORD    STR

Returns the users ID if the login is valid, so the
ID can be stored in the session to get access to
the users pages.


GET /api/register/NAME&PASSWORD&AGE&EMAIL&RELATION

    NAME        STR
    PASSWORD    STR
    AGE         INT
    EMAIL       STR
    RELATION    STR in {"child", "parent", "sibling", 
                        "grandchildren", "grandparent",
                        "pibling", "other" }

Registers a user by creating a new User and saving it
to the database.
