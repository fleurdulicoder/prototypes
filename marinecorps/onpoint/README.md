PACKAGE HANDLING
-------------------------------------------------------------------------------
To minify files, install npm smoosh module globally:
$ npm install -g smoosh

To minify files run inside the folder:
$ smoosh ./config.json

ON-POINT ANIMATION CHOREOGRAPHY
-------------------------------------------------------------------------------

##Features

Version 1:

Notify bar prototyping features triple cascade of animation:

1. The notify bar slides down from top
2. On-Point headline flashes in
3. The content line slides in from left to right
4. Content line sentences are navigated by arrows
5. Close icon removes the notify on-point bar from view

The slide in from top of the notify bar is simple. It is followed by the  
focal animation - the On-Point headline draws attention by flashing in rapidly.
The slight motion of the content bar next to it is subtle, yet adds a final dot
to the overall animation.

Custom Curves:

1. Notify Bar Slide Down/Up: cubic-bezier(.41,.91,.52,.94)
2. Content Ease-In: cubic-bezier(.67,.54,.43,.78)


Version 2: