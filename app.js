{\rtf1\ansi\ansicpg1252\cocoartf2870
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fnil\fcharset0 Menlo-Regular;\f1\fnil\fcharset0 Menlo-Italic;}
{\colortbl;\red255\green255\blue255;\red147\green0\blue147;\red42\green44\blue51;\red50\green94\blue238;
\red167\green87\blue5;\red143\green144\blue150;\red66\green147\blue62;}
{\*\expandedcolortbl;;\cssrgb\c65098\c14902\c64314;\cssrgb\c21961\c22745\c25882;\cssrgb\c25098\c47059\c94902;
\cssrgb\c71765\c41961\c392;\cssrgb\c62745\c63137\c65490;\cssrgb\c31373\c63137\c30980;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\deftab720
\pard\pardeftab720\partightenfactor0

\f0\fs28 \cf2 \expnd0\expndtw0\kerning0
\outl0\strokewidth0 \strokec2 let\cf3 \strokec3  currentWeek \cf4 \strokec4 =\cf3 \strokec3  \cf5 \strokec5 1\cf3 \strokec3 ;\
\
\pard\pardeftab720\partightenfactor0

\f1\i \cf6 \strokec6 // Load saved data from localStorage
\f0\i0 \cf3 \strokec3 \
\pard\pardeftab720\partightenfactor0
\cf2 \strokec2 function\cf3 \strokec3  \cf4 \strokec4 loadSavedData\cf3 \strokec3 () \{\
    \cf2 \strokec2 const\cf3 \strokec3  saved \cf4 \strokec4 =\cf3 \strokec3  \cf4 \strokec4 localStorage\cf3 \strokec3 .\cf4 \strokec4 getItem\cf3 \strokec3 (\cf7 \strokec7 'veggieTracker'\cf3 \strokec3 );\
    \cf2 \strokec2 return\cf3 \strokec3  saved \cf4 \strokec4 ?\cf3 \strokec3  \cf5 \strokec5 JSON\cf3 \strokec3 .\cf4 \strokec4 parse\cf3 \strokec3 (saved) \cf4 \strokec4 :\cf3 \strokec3  \{\};\
\}\
\
\pard\pardeftab720\partightenfactor0

\f1\i \cf6 \strokec6 // Save data to localStorage
\f0\i0 \cf3 \strokec3 \
\pard\pardeftab720\partightenfactor0
\cf2 \strokec2 function\cf3 \strokec3  \cf4 \strokec4 saveData\cf3 \strokec3 () \{\
    \cf2 \strokec2 const\cf3 \strokec3  data \cf4 \strokec4 =\cf3 \strokec3  \cf4 \strokec4 loadData\cf3 \strokec3 ();\
    \cf2 \strokec2 const\cf3 \strokec3  selected \cf4 \strokec4 =\cf3 \strokec3  \cf4 \strokec4 document\cf3 \strokec3 .\cf4 \strokec4 querySelectorAll\cf3 \strokec3 (\cf7 \strokec7 '.veg-checkbox:checked'\cf3 \strokec3 );\
    data[\cf7 \strokec7 `week_\cf3 \strokec3 $\{currentWeek\}\cf7 \strokec7 `\cf3 \strokec3 ] \cf4 \strokec4 =\cf3 \strokec3  \cf5 \strokec5 Array\cf3 \strokec3 .\cf2 \strokec2 from\cf3 \strokec3 (selected).\cf4 \strokec4 map\cf3 \strokec3 (cb \cf4 \strokec4 =>\cf3 \strokec3  cb.dataset.veg);\
    \cf4 \strokec4 localStorage\cf3 \strokec3 .\cf4 \strokec4 setItem\cf3 \strokec3 (\cf7 \strokec7 'veggieTracker'\cf3 \strokec3 , \cf5 \strokec5 JSON\cf3 \strokec3 .\cf4 \strokec4 stringify\cf3 \strokec3 (data));\
    \cf4 \strokec4 showStatus\cf3 \strokec3 (\cf7 \strokec7 'Progress saved!'\cf3 \strokec3 , \cf7 \strokec7 'success'\cf3 \strokec3 );\
\}\
\
\pard\pardeftab720\partightenfactor0

\f1\i \cf6 \strokec6 // Load data helper
\f0\i0 \cf3 \strokec3 \
\pard\pardeftab720\partightenfactor0
\cf2 \strokec2 function\cf3 \strokec3  \cf4 \strokec4 loadData\cf3 \strokec3 () \{\
    \cf2 \strokec2 return\cf3 \strokec3  \cf5 \strokec5 JSON\cf3 \strokec3 .\cf4 \strokec4 parse\cf3 \strokec3 (\cf4 \strokec4 localStorage\cf3 \strokec3 .\cf4 \strokec4 getItem\cf3 \strokec3 (\cf7 \strokec7 'veggieTracker'\cf3 \strokec3 ) \cf4 \strokec4 ||\cf3 \strokec3  \cf7 \strokec7 '\{\}'\cf3 \strokec3 );\
\}\
\
\pard\pardeftab720\partightenfactor0

\f1\i \cf6 \strokec6 // Render vegetable checkboxes for current week
\f0\i0 \cf3 \strokec3 \
\pard\pardeftab720\partightenfactor0
\cf2 \strokec2 function\cf3 \strokec3  \cf4 \strokec4 renderVegetables\cf3 \strokec3 () \{\
    \cf2 \strokec2 const\cf3 \strokec3  container \cf4 \strokec4 =\cf3 \strokec3  \cf4 \strokec4 document\cf3 \strokec3 .\cf4 \strokec4 getElementById\cf3 \strokec3 (\cf7 \strokec7 'vegetableContainer'\cf3 \strokec3 );\
    \cf2 \strokec2 const\cf3 \strokec3  savedData \cf4 \strokec4 =\cf3 \strokec3  \cf4 \strokec4 loadSavedData\cf3 \strokec3 ();\
    \cf2 \strokec2 const\cf3 \strokec3  weekKey \cf4 \strokec4 =\cf3 \strokec3  \cf7 \strokec7 `week_\cf3 \strokec3 $\{currentWeek\}\cf7 \strokec7 `\cf3 \strokec3 ;\
    \cf2 \strokec2 const\cf3 \strokec3  selectedVeggies \cf4 \strokec4 =\cf3 \strokec3  savedData[weekKey] \cf4 \strokec4 ||\cf3 \strokec3  [];\
\
    \cf2 \strokec2 let\cf3 \strokec3  html \cf4 \strokec4 =\cf3 \strokec3  \cf7 \strokec7 ''\cf3 \strokec3 ;\
    vegetableData.\cf4 \strokec4 forEach\cf3 \strokec3 (cat \cf4 \strokec4 =>\cf3 \strokec3  \{\
        html \cf4 \strokec4 +=\cf3 \strokec3  \cf7 \strokec7 `<section class="category">`\cf3 \strokec3 ;\
        html \cf4 \strokec4 +=\cf3 \strokec3  \cf7 \strokec7 `<h2>\cf3 \strokec3 $\{cat.category\}\cf7 \strokec7 </h2>`\cf3 \strokec3 ;\
        cat.vegetables.\cf4 \strokec4 forEach\cf3 \strokec3 (veg \cf4 \strokec4 =>\cf3 \strokec3  \{\
            \cf2 \strokec2 const\cf3 \strokec3  checked \cf4 \strokec4 =\cf3 \strokec3  selectedVeggies.\cf4 \strokec4 includes\cf3 \strokec3 (veg) \cf4 \strokec4 ?\cf3 \strokec3  \cf7 \strokec7 'checked'\cf3 \strokec3  \cf4 \strokec4 :\cf3 \strokec3  \cf7 \strokec7 ''\cf3 \strokec3 ;\
            html \cf4 \strokec4 +=\cf3 \strokec3  \cf7 \strokec7 `<label class="veg-label">`\cf3 \strokec3 ;\
            html \cf4 \strokec4 +=\cf3 \strokec3  \cf7 \strokec7 `<input type="checkbox" class="veg-checkbox" data-veg="\cf3 \strokec3 $\{veg\}\cf7 \strokec7 " \cf3 \strokec3 $\{checked\}\cf7 \strokec7 >`\cf3 \strokec3 ;\
            html \cf4 \strokec4 +=\cf3 \strokec3  \cf7 \strokec7 `\cf3 \strokec3 $\{veg\}\cf7 \strokec7 `\cf3 \strokec3 ;\
            html \cf4 \strokec4 +=\cf3 \strokec3  \cf7 \strokec7 `</label>`\cf3 \strokec3 ;\
        \});\
        html \cf4 \strokec4 +=\cf3 \strokec3  \cf7 \strokec7 `</section>`\cf3 \strokec3 ;\
    \});\
    container.innerHTML \cf4 \strokec4 =\cf3 \strokec3  html;\
\
    \cf4 \strokec4 document\cf3 \strokec3 .\cf4 \strokec4 getElementById\cf3 \strokec3 (\cf7 \strokec7 'currentWeekDisplay'\cf3 \strokec3 ).textContent \cf4 \strokec4 =\cf3 \strokec3  \cf7 \strokec7 `Week \cf3 \strokec3 $\{currentWeek\}\cf7 \strokec7 `\cf3 \strokec3 ;\
\}\
\
\pard\pardeftab720\partightenfactor0

\f1\i \cf6 \strokec6 // Event Listeners
\f0\i0 \cf3 \strokec3 \
\pard\pardeftab720\partightenfactor0
\cf4 \strokec4 document\cf3 \strokec3 .\cf4 \strokec4 getElementById\cf3 \strokec3 (\cf7 \strokec7 'prevWeek'\cf3 \strokec3 ).\cf4 \strokec4 addEventListener\cf3 \strokec3 (\cf7 \strokec7 'click'\cf3 \strokec3 , () \cf4 \strokec4 =>\cf3 \strokec3  \{\
    \cf2 \strokec2 if\cf3 \strokec3  (currentWeek \cf4 \strokec4 >\cf3 \strokec3  \cf5 \strokec5 1\cf3 \strokec3 ) \{\
        currentWeek\cf4 \strokec4 --\cf3 \strokec3 ;\
        \cf4 \strokec4 renderVegetables\cf3 \strokec3 ();\
    \}\
\});\
\
\cf4 \strokec4 document\cf3 \strokec3 .\cf4 \strokec4 getElementById\cf3 \strokec3 (\cf7 \strokec7 'nextWeek'\cf3 \strokec3 ).\cf4 \strokec4 addEventListener\cf3 \strokec3 (\cf7 \strokec7 'click'\cf3 \strokec3 , () \cf4 \strokec4 =>\cf3 \strokec3  \{\
    \cf2 \strokec2 if\cf3 \strokec3  (currentWeek \cf4 \strokec4 <\cf3 \strokec3  totalWeeks) \{\
        currentWeek\cf4 \strokec4 ++\cf3 \strokec3 ;\
        \cf4 \strokec4 renderVegetables\cf3 \strokec3 ();\
    \}\
\});\
\
\cf4 \strokec4 document\cf3 \strokec3 .\cf4 \strokec4 getElementById\cf3 \strokec3 (\cf7 \strokec7 'saveBtn'\cf3 \strokec3 ).\cf4 \strokec4 addEventListener\cf3 \strokec3 (\cf7 \strokec7 'click'\cf3 \strokec3 , saveData);\
\
\cf4 \strokec4 document\cf3 \strokec3 .\cf4 \strokec4 getElementById\cf3 \strokec3 (\cf7 \strokec7 'resetWeekBtn'\cf3 \strokec3 ).\cf4 \strokec4 addEventListener\cf3 \strokec3 (\cf7 \strokec7 'click'\cf3 \strokec3 , () \cf4 \strokec4 =>\cf3 \strokec3  \{\
    \cf2 \strokec2 if\cf3 \strokec3  (\cf4 \strokec4 confirm\cf3 \strokec3 (\cf7 \strokec7 `Clear all selections for Week \cf3 \strokec3 $\{currentWeek\}\cf7 \strokec7 ?`\cf3 \strokec3 )) \{\
        \cf2 \strokec2 const\cf3 \strokec3  saved \cf4 \strokec4 =\cf3 \strokec3  \cf4 \strokec4 loadSavedData\cf3 \strokec3 ();\
        \cf2 \strokec2 delete\cf3 \strokec3  saved[\cf7 \strokec7 `week_\cf3 \strokec3 $\{currentWeek\}\cf7 \strokec7 `\cf3 \strokec3 ];\
        \cf4 \strokec4 localStorage\cf3 \strokec3 .\cf4 \strokec4 setItem\cf3 \strokec3 (\cf7 \strokec7 'veggieTracker'\cf3 \strokec3 , \cf5 \strokec5 JSON\cf3 \strokec3 .\cf4 \strokec4 stringify\cf3 \strokec3 (saved));\
        \cf4 \strokec4 renderVegetables\cf3 \strokec3 ();\
        \cf4 \strokec4 showStatus\cf3 \strokec3 (\cf7 \strokec7 'Week reset.'\cf3 \strokec3 , \cf7 \strokec7 'info'\cf3 \strokec3 );\
    \}\
\});\
\
\pard\pardeftab720\partightenfactor0

\f1\i \cf6 \strokec6 // Auto-save when checkbox changes
\f0\i0 \cf3 \strokec3 \
\pard\pardeftab720\partightenfactor0
\cf4 \strokec4 document\cf3 \strokec3 .\cf4 \strokec4 addEventListener\cf3 \strokec3 (\cf7 \strokec7 'change'\cf3 \strokec3 , (e) \cf4 \strokec4 =>\cf3 \strokec3  \{\
    \cf2 \strokec2 if\cf3 \strokec3  (e.target.classList.\cf4 \strokec4 contains\cf3 \strokec3 (\cf7 \strokec7 'veg-checkbox'\cf3 \strokec3 )) \{\
        \cf4 \strokec4 saveData\cf3 \strokec3 ();\
    \}\
\});\
\
\pard\pardeftab720\partightenfactor0
\cf2 \strokec2 function\cf3 \strokec3  \cf4 \strokec4 showStatus\cf3 \strokec3 (msg, type) \{\
    \cf2 \strokec2 const\cf3 \strokec3  el \cf4 \strokec4 =\cf3 \strokec3  \cf4 \strokec4 document\cf3 \strokec3 .\cf4 \strokec4 getElementById\cf3 \strokec3 (\cf7 \strokec7 'statusMsg'\cf3 \strokec3 );\
    el.textContent \cf4 \strokec4 =\cf3 \strokec3  msg;\
    el.className \cf4 \strokec4 =\cf3 \strokec3  \cf7 \strokec7 `status-\cf3 \strokec3 $\{type\}\cf7 \strokec7 `\cf3 \strokec3 ;\
    \cf4 \strokec4 setTimeout\cf3 \strokec3 (() \cf4 \strokec4 =>\cf3 \strokec3  el.textContent \cf4 \strokec4 =\cf3 \strokec3  \cf7 \strokec7 ''\cf3 \strokec3 , \cf5 \strokec5 3000\cf3 \strokec3 );\
\}\
\
\pard\pardeftab720\partightenfactor0

\f1\i \cf6 \strokec6 // Initialize
\f0\i0 \cf3 \strokec3 \
\pard\pardeftab720\partightenfactor0
\cf4 \strokec4 renderVegetables\cf3 \strokec3 ();}