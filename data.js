{\rtf1\ansi\ansicpg1252\cocoartf2870
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fnil\fcharset0 Menlo-Regular;\f1\fnil\fcharset0 Menlo-Italic;}
{\colortbl;\red255\green255\blue255;\red147\green0\blue147;\red42\green44\blue51;\red50\green94\blue238;
\red219\green63\blue57;\red66\green147\blue62;\red167\green87\blue5;\red143\green144\blue150;}
{\*\expandedcolortbl;;\cssrgb\c65098\c14902\c64314;\cssrgb\c21961\c22745\c25882;\cssrgb\c25098\c47059\c94902;
\cssrgb\c89412\c33725\c28627;\cssrgb\c31373\c63137\c30980;\cssrgb\c71765\c41961\c392;\cssrgb\c62745\c63137\c65490;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\deftab720
\pard\pardeftab720\partightenfactor0

\f0\fs28 \cf2 \expnd0\expndtw0\kerning0
\outl0\strokewidth0 \strokec2 const\cf3 \strokec3  vegetableData \cf4 \strokec4 =\cf3 \strokec3  [\
    \{ \cf5 \strokec5 category\cf4 \strokec4 :\cf3 \strokec3  \cf6 \strokec6 "Leafy Greens"\cf3 \strokec3 , \cf5 \strokec5 vegetables\cf4 \strokec4 :\cf3 \strokec3  [\cf6 \strokec6 "Spinach"\cf3 \strokec3 , \cf6 \strokec6 "Kale"\cf3 \strokec3 , \cf6 \strokec6 "Lettuce"\cf3 \strokec3 , \cf6 \strokec6 "Collard Greens"\cf3 \strokec3 , \cf6 \strokec6 "Arugula"\cf3 \strokec3 , \cf6 \strokec6 "Swiss Chard"\cf3 \strokec3 , \cf6 \strokec6 "Bok Choy"\cf3 \strokec3 ] \},\
    \{ \cf5 \strokec5 category\cf4 \strokec4 :\cf3 \strokec3  \cf6 \strokec6 "Root Vegetables"\cf3 \strokec3 , \cf5 \strokec5 vegetables\cf4 \strokec4 :\cf3 \strokec3  [\cf6 \strokec6 "Carrots"\cf3 \strokec3 , \cf6 \strokec6 "Beets"\cf3 \strokec3 , \cf6 \strokec6 "Radishes"\cf3 \strokec3 , \cf6 \strokec6 "Turnips"\cf3 \strokec3 , \cf6 \strokec6 "Potatoes"\cf3 \strokec3 , \cf6 \strokec6 "Sweet Potatoes"\cf3 \strokec3 ] \},\
    \{ \cf5 \strokec5 category\cf4 \strokec4 :\cf3 \strokec3  \cf6 \strokec6 "Bulb & Stem Vegetables"\cf3 \strokec3 , \cf5 \strokec5 vegetables\cf4 \strokec4 :\cf3 \strokec3  [\cf6 \strokec6 "Onions"\cf3 \strokec3 , \cf6 \strokec6 "Garlic"\cf3 \strokec3 , \cf6 \strokec6 "Leeks"\cf3 \strokec3 , \cf6 \strokec6 "Celery"\cf3 \strokec3 , \cf6 \strokec6 "Fennel"\cf3 \strokec3 , \cf6 \strokec6 "Asparagus"\cf3 \strokec3 ] \},\
    \{ \cf5 \strokec5 category\cf4 \strokec4 :\cf3 \strokec3  \cf6 \strokec6 "Flower Vegetables"\cf3 \strokec3 , \cf5 \strokec5 vegetables\cf4 \strokec4 :\cf3 \strokec3  [\cf6 \strokec6 "Broccoli"\cf3 \strokec3 , \cf6 \strokec6 "Cauliflower"\cf3 \strokec3 , \cf6 \strokec6 "Artichoke"\cf3 \strokec3 ] \},\
    \{ \cf5 \strokec5 category\cf4 \strokec4 :\cf3 \strokec3  \cf6 \strokec6 "Fruit Vegetables"\cf3 \strokec3 , \cf5 \strokec5 vegetables\cf4 \strokec4 :\cf3 \strokec3  [\cf6 \strokec6 "Tomatoes"\cf3 \strokec3 , \cf6 \strokec6 "Bell Peppers"\cf3 \strokec3 , \cf6 \strokec6 "Eggplants"\cf3 \strokec3 , \cf6 \strokec6 "Cucumbers"\cf3 \strokec3 , \cf6 \strokec6 "Zucchini"\cf3 \strokec3 ] \},\
    \{ \cf5 \strokec5 category\cf4 \strokec4 :\cf3 \strokec3  \cf6 \strokec6 "Pod & Legume Vegetables"\cf3 \strokec3 , \cf5 \strokec5 vegetables\cf4 \strokec4 :\cf3 \strokec3  [\cf6 \strokec6 "Green Beans"\cf3 \strokec3 , \cf6 \strokec6 "Peas"\cf3 \strokec3 , \cf6 \strokec6 "Chickpeas"\cf3 \strokec3 , \cf6 \strokec6 "Lentils"\cf3 \strokec3 ] \},\
    \{ \cf5 \strokec5 category\cf4 \strokec4 :\cf3 \strokec3  \cf6 \strokec6 "Starchy Vegetables"\cf3 \strokec3 , \cf5 \strokec5 vegetables\cf4 \strokec4 :\cf3 \strokec3  [\cf6 \strokec6 "Corn"\cf3 \strokec3 , \cf6 \strokec6 "Winter Squash"\cf3 \strokec3 ] \},\
    \{ \cf5 \strokec5 category\cf4 \strokec4 :\cf3 \strokec3  \cf6 \strokec6 "Other Cruciferous"\cf3 \strokec3 , \cf5 \strokec5 vegetables\cf4 \strokec4 :\cf3 \strokec3  [\cf6 \strokec6 "Brussels Sprouts"\cf3 \strokec3 , \cf6 \strokec6 "Kohlrabi"\cf3 \strokec3 ] \}\
];\
\
\cf2 \strokec2 const\cf3 \strokec3  totalWeeks \cf4 \strokec4 =\cf3 \strokec3  \cf7 \strokec7 52\cf3 \strokec3 ; 
\f1\i \cf8 \strokec8 // You can change this based on your needs}