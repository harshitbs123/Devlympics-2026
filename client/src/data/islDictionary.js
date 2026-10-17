import signDurations from './signDurations.json';

// Master ISL Phrase & Word Dictionary (119 real human demonstration GIFs)
export const ISL_ENTRIES = [
  // Multi-word conversational & emergency phrases (sorted by length for greedy matching)
  { phrase: 'how many people are in your family', gif: 'how many people are in your family.gif', label: 'HOW MANY PEOPLE IN FAMILY', hindi: 'परिवार में कितने लोग हैं?' },
  { phrase: 'i had to say something but i forgot', gif: 'i had to say something but I forgot.gif', label: 'I FORGOT WHAT TO SAY', hindi: 'कुछ कहना था पर भूल गया' },
  { phrase: 'do you want something to drink', gif: 'do you want something to drink.gif', label: 'WANT SOMETHING TO DRINK', hindi: 'कुछ पीना चाहते हैं?' },
  { phrase: 'where is the police station', gif: 'where is the police station.gif', label: 'WHERE IS POLICE STATION', hindi: 'पुलिस स्टेशन कहाँ है?' },
  { phrase: 'where is the bathroom', gif: 'where is the bathroom.gif', label: 'WHERE IS BATHROOM', hindi: 'शौचालय कहाँ है?' },
  { phrase: 'shall we go together tomorrow', gif: 'shall we go together tomorrow.gif', label: 'GO TOGETHER TOMORROW', hindi: 'क्या कल साथ चलें?' },
  { phrase: 'shall we go together tommorow', gif: 'shall we go together tommorow.gif', label: 'GO TOGETHER TOMORROW', hindi: 'क्या कल साथ चलें?' },
  { phrase: 'please call the ambulance', gif: 'please call the ambulance.gif', label: 'CALL AMBULANCE', hindi: 'कृपया एम्बुलेंस बुलाइए' },
  { phrase: 'please wait for sometime', gif: 'please wait for sometime.gif', label: 'PLEASE WAIT', hindi: 'कृपया प्रतीक्षा करें' },
  { phrase: 'what is your mobile number', gif: 'what is your mobile number.gif', label: 'YOUR MOBILE NUMBER', hindi: 'आपका मोबाइल नंबर क्या है?' },
  { phrase: 'what does your father do', gif: 'what does your father do.gif', label: 'WHAT DOES FATHER DO', hindi: 'पिताजी क्या करते हैं?' },
  { phrase: 'what is your father do', gif: 'what is your father do.gif', label: 'WHAT DOES FATHER DO', hindi: 'पिताजी क्या करते हैं?' },
  { phrase: 'did you finish homework', gif: 'did you finish homework.gif', label: 'FINISHED HOMEWORK', hindi: 'क्या गृहकार्य पूरा किया?' },
  { phrase: 'do you want tea or coffee', gif: 'do you want tea or coffee.gif', label: 'TEA OR COFFEE', hindi: 'चाय या कॉफ़ी?' },
  { phrase: 'i dont understand anything', gif: 'i dont understand anything.gif', label: 'I DONT UNDERSTAND', hindi: 'मुझे कुछ समझ नहीं आया' },
  { phrase: 'sign language interpreter', gif: 'sign language interpreter.gif', label: 'SIGN INTERPRETER', hindi: 'सांकेतिक भाषा अनुवादक' },
  { phrase: 'my mother is a housewife', gif: 'my mother is a housewife.gif', label: 'MOTHER IS HOUSEWIFE', hindi: 'मेरी माँ गृहिणी हैं' },
  { phrase: 'when is your interview', gif: 'when is your interview.gif', label: 'WHEN IS INTERVIEW', hindi: 'साक्षात्कार कब है?' },
  { phrase: 'flower is beautiful', gif: 'flower is beautiful.gif', label: 'FLOWER IS BEAUTIFUL', hindi: 'फूल सुंदर है' },
  { phrase: 'please call me later', gif: 'please call me later.gif', label: 'CALL ME LATER', hindi: 'कृपया बाद में कॉल करें' },
  { phrase: 'there was traffic jam', gif: 'there was traffic jam.gif', label: 'TRAFFIC JAM', hindi: 'ट्रैफिक जाम था' },
  { phrase: 'what is your name', gif: 'what is your name.gif', label: 'WHAT IS YOUR NAME', hindi: 'आपका नाम क्या है?' },
  { phrase: 'whats your name', gif: 'what is your name.gif', label: 'WHAT IS YOUR NAME', hindi: 'आपका नाम क्या है?' },
  { phrase: 'aapka naam kya hai', gif: 'what is your name.gif', label: 'WHAT IS YOUR NAME', hindi: 'आपका नाम क्या है?' },
  { phrase: 'what are you doing', gif: 'what are you doing.gif', label: 'WHAT ARE YOU DOING', hindi: 'आप क्या कर रहे हैं?' },
  { phrase: 'kya kar rahe ho', gif: 'what are you doing.gif', label: 'WHAT ARE YOU DOING', hindi: 'क्या कर रहे हो?' },
  { phrase: 'can we meet tomorrow', gif: 'can we meet tomorrow.gif', label: 'MEET TOMORROW', hindi: 'क्या कल मिल सकते हैं?' },
  { phrase: 'shall i help you', gif: 'shall I help you.gif', label: 'SHALL I HELP YOU', hindi: 'क्या मैं मदद करूँ?' },
  { phrase: 'can i help you', gif: 'can i help you.gif', label: 'CAN I HELP YOU', hindi: 'क्या मैं मदद करूँ?' },
  { phrase: 'kya main madad karu', gif: 'shall I help you.gif', label: 'SHALL I HELP YOU', hindi: 'क्या मैं मदद करूँ?' },
  { phrase: 'do you watch tv', gif: 'do you watch TV.gif', label: 'WATCH TV', hindi: 'क्या आप टीवी देखते हैं?' },
  { phrase: 'nice to meet you', gif: 'nice to meet you.gif', label: 'NICE TO MEET YOU', hindi: 'आपसे मिलकर खुशी हुई' },
  { phrase: 'aapse milkar khushi hui', gif: 'nice to meet you.gif', label: 'NICE TO MEET YOU', hindi: 'आपसे मिलकर खुशी हुई' },
  { phrase: 'do you have money', gif: 'do you have money.gif', label: 'HAVE MONEY', hindi: 'क्या पैसे हैं?' },
  { phrase: 'do you go to office', gif: 'do you go to office.gif', label: 'GO TO OFFICE', hindi: 'क्या दफ़्तर जाते हैं?' },
  { phrase: 'lets go for lunch', gif: 'lets go for lunch.gif', label: 'LETS HAVE LUNCH', hindi: 'दोपहर के भोजन के लिए चलें' },
  { phrase: 'what is your age', gif: 'what is your age.gif', label: 'WHAT IS YOUR AGE', hindi: 'आपकी उम्र क्या है?' },
  { phrase: 'what is your job', gif: 'what is your job.gif', label: 'WHAT IS YOUR JOB', hindi: 'आपका काम क्या है?' },
  { phrase: 'what is the problem', gif: 'what is the problem.gif', label: 'WHAT IS PROBLEM', hindi: 'क्या समस्या है?' },
  { phrase: 'kya samasya hai', gif: 'what is the problem.gif', label: 'WHAT IS PROBLEM', hindi: 'क्या समस्या है?' },
  { phrase: 'what is todays date', gif: 'what is todays date.gif', label: 'TODAYS DATE', hindi: 'आज की तारीख क्या है?' },
  { phrase: 'what is today date', gif: "what is today's date.gif", label: 'TODAYS DATE', hindi: 'आज की तारीख क्या है?' },
  { phrase: "what is today's date", gif: "what is today's date.gif", label: 'TODAYS DATE', hindi: 'आज की तारीख क्या है?' },
  { phrase: 'where do you live', gif: 'where do you live.gif', label: 'WHERE DO YOU LIVE', hindi: 'आप कहाँ रहते हैं?' },
  { phrase: 'aap kahan rehte ho', gif: 'where do you live.gif', label: 'WHERE DO YOU LIVE', hindi: 'आप कहाँ रहते हैं?' },
  { phrase: 'i have a headache', gif: 'i have a headache.gif', label: 'HAVE HEADACHE', hindi: 'सिरदर्द हो रहा है' },
  { phrase: 'sir dard ho raha hai', gif: 'i have a headache.gif', label: 'HAVE HEADACHE', hindi: 'सिरदर्द हो रहा है' },
  { phrase: 'i go to a theatre', gif: 'i go to a theatre.gif', label: 'GO TO THEATRE', hindi: 'थिएटर जा रहा हूँ' },
  { phrase: 'i like pink colour', gif: 'i like pink colour.gif', label: 'LIKE PINK', hindi: 'गुलाबी रंग पसंद है' },
  { phrase: 'did you eat lunch', gif: 'did you eat lunch.gif', label: 'HAD LUNCH', hindi: 'क्या खाना खा लिया?' },
  { phrase: 'खाना खा लिया', gif: 'did you eat lunch.gif', label: 'HAD LUNCH', hindi: 'खाना खा लिया?' },
  { phrase: 'please dont smoke', gif: 'please dont smoke.gif', label: 'DONT SMOKE', hindi: 'धूम्रपान न करें' },
  { phrase: 'good afternoon', gif: 'good afternoon.gif', label: 'GOOD AFTERNOON', hindi: 'शुभ दोपहर' },
  { phrase: 'good morning', gif: 'good morning.gif', label: 'GOOD MORNING', hindi: 'शुभ प्रभात' },
  { phrase: 'shubh prabhat', gif: 'good morning.gif', label: 'GOOD MORNING', hindi: 'शुभ प्रभात' },
  { phrase: 'good evening', gif: 'good evening.gif', label: 'GOOD EVENING', hindi: 'शुभ संध्या' },
  { phrase: 'good question', gif: 'good question.gif', label: 'GOOD QUESTION', hindi: 'अच्छा सवाल' },
  { phrase: 'good night', gif: 'good night.gif', label: 'GOOD NIGHT', hindi: 'शुभ रात्रि' },
  { phrase: 'shubh ratri', gif: 'good night.gif', label: 'GOOD NIGHT', hindi: 'शुभ रात्रि' },
  { phrase: 'happy journey', gif: 'happy journey.gif', label: 'HAPPY JOURNEY', hindi: 'शुभ यात्रा' },
  { phrase: 'shubh yatra', gif: 'happy journey.gif', label: 'HAPPY JOURNEY', hindi: 'शुभ यात्रा' },
  { phrase: 'all the best', gif: 'all the best.gif', label: 'ALL THE BEST', hindi: 'शुभकामनाएं' },
  { phrase: 'shubh kamnaye', gif: 'all the best.gif', label: 'ALL THE BEST', hindi: 'शुभकामनाएं' },
  { phrase: 'wait i am thinking', gif: 'wait i am thinking.gif', label: 'WAIT THINKING', hindi: 'रुकिए, सोच रहा हूँ' },
  { phrase: 'i am thinking', gif: 'i am thinking.gif', label: 'I AM THINKING', hindi: 'मैं सोच रहा हूँ' },
  { phrase: 'i am tired', gif: 'i am tired.gif', label: 'I AM TIRED', hindi: 'मैं थक गया हूँ' },
  { phrase: 'main thak gaya', gif: 'i am tired.gif', label: 'I AM TIRED', hindi: 'मैं थक गया हूँ' },
  { phrase: 'i am bored', gif: 'i am bored.gif', label: 'I AM BORED', hindi: 'बोर हो रहा हूँ' },
  { phrase: 'i am sorry', gif: 'i am sorry.gif', label: 'I AM SORRY', hindi: 'मुझे क्षमा करें' },
  { phrase: 'maaf kijiye', gif: 'i am sorry.gif', label: 'I AM SORRY', hindi: 'माफ कीजिए' },
  { phrase: 'i am fine', gif: 'i am fine.gif', label: 'I AM FINE', hindi: 'मैं ठीक हूँ' },
  { phrase: 'main theek hoon', gif: 'i am fine.gif', label: 'I AM FINE', hindi: 'मैं ठीक हूँ' },
  { phrase: 'i love to shop', gif: 'i love to shop.gif', label: 'LOVE SHOPPING', hindi: 'खरीदारी पसंद है' },
  { phrase: 'open the door', gif: 'open the door.gif', label: 'OPEN DOOR', hindi: 'दरवाजा खोलिए' },
  { phrase: 'darwaza kholo', gif: 'open the door.gif', label: 'OPEN DOOR', hindi: 'दरवाजा खोलिए' },
  { phrase: 'clean the room', gif: 'clean the room.gif', label: 'CLEAN ROOM', hindi: 'कमरा साफ करें' },
  { phrase: 'give me your pen', gif: 'give me your pen.gif', label: 'GIVE PEN', hindi: 'अपना पेन दीजिए' },
  { phrase: 'pen dijiye', gif: 'give me your pen.gif', label: 'GIVE PEN', hindi: 'अपना पेन दीजिए' },
  { phrase: 'call me later', gif: 'call me later.gif', label: 'CALL LATER', hindi: 'बाद में कॉल करें' },
  { phrase: 'when will we go', gif: 'when will we go.gif', label: 'WHEN WILL WE GO', hindi: 'कब चलेंगे?' },
  { phrase: 'hum kab chalenge', gif: 'when will we go.gif', label: 'WHEN WILL WE GO', hindi: 'कब चलेंगे?' },
  { phrase: 'are you hungry', gif: 'are you hungry.gif', label: 'ARE YOU HUNGRY', hindi: 'भूख लगी है?' },
  { phrase: 'bhookh lagi hai', gif: 'are you hungry.gif', label: 'ARE YOU HUNGRY', hindi: 'भूख लगी है?' },
  { phrase: 'are you angry', gif: 'are you angry.gif', label: 'ARE YOU ANGRY', hindi: 'क्या आप नाराज़ हैं?' },
  { phrase: 'gussa ho kya', gif: 'are you angry.gif', label: 'ARE YOU ANGRY', hindi: 'क्या नाराज़ हैं?' },
  { phrase: 'are you busy', gif: 'are you busy.gif', label: 'ARE YOU BUSY', hindi: 'क्या आप व्यस्त हैं?' },
  { phrase: 'are you sick', gif: 'are you sick.gif', label: 'ARE YOU SICK', hindi: 'क्या आप बीमार हैं?' },
  { phrase: 'bimar ho kya', gif: 'are you sick.gif', label: 'ARE YOU SICK', hindi: 'क्या बीमार हैं?' },
  { phrase: 'you are wrong', gif: 'you are wrong.gif', label: 'YOU ARE WRONG', hindi: 'आप गलत हैं' },
  { phrase: 'aap galat ho', gif: 'you are wrong.gif', label: 'YOU ARE WRONG', hindi: 'आप गलत हैं' },
  { phrase: 'any questions', gif: 'any questions.gif', label: 'ANY QUESTIONS', hindi: 'कोई प्रश्न?' },
  { phrase: 'koi sawal hai', gif: 'any questions.gif', label: 'ANY QUESTIONS', hindi: 'कोई सवाल है?' },
  { phrase: 'dont worry', gif: 'dont worry.gif', label: 'DONT WORRY', hindi: 'चिंता मत करो' },
  { phrase: 'chinta mat karo', gif: 'dont worry.gif', label: 'DONT WORRY', hindi: 'चिंता मत करो' },
  { phrase: 'be careful', gif: 'be careful.gif', label: 'BE CAREFUL', hindi: 'सावधान रहें' },
  { phrase: 'dhyan se', gif: 'be careful.gif', label: 'BE CAREFUL', hindi: 'ध्यान से' },
  { phrase: 'take care', gif: 'take care.gif', label: 'TAKE CARE', hindi: 'ख्याल रखना' },
  { phrase: 'apna khayal rakhna', gif: 'take care.gif', label: 'TAKE CARE', hindi: 'ख्याल रखना' },
  { phrase: 'sit down', gif: 'sit down.gif', label: 'SIT DOWN', hindi: 'बैठ जाइए' },
  { phrase: 'baith jaiye', gif: 'sit down.gif', label: 'SIT DOWN', hindi: 'बैठ जाइए' },
  { phrase: 'stand up', gif: 'stand up.gif', label: 'STAND UP', hindi: 'खड़े हो जाइए' },
  { phrase: 'khade ho jaiye', gif: 'stand up.gif', label: 'STAND UP', hindi: 'खड़े हो जाइए' },
  { phrase: 'police station', gif: 'police station.gif', label: 'POLICE STATION', hindi: 'पुलिस थाना' },
  { phrase: 'post office', gif: 'post office.gif', label: 'POST OFFICE', hindi: 'डाकघर' },
  { phrase: 'whats up', gif: 'whats up.gif', label: 'WHATS UP', hindi: 'क्या चल रहा है?' },
  { phrase: 'kya chal raha hai', gif: 'whats up.gif', label: 'WHATS UP', hindi: 'क्या चल रहा है?' },
  { phrase: 'i am a clerk', gif: 'i am a clerk.gif', label: 'I AM CLERK', hindi: 'मैं क्लर्क हूँ' },

  // Single word items
  { phrase: 'hello', gif: 'hello.gif', label: 'HELLO', hindi: 'नमस्ते' },
  { phrase: 'hi', gif: 'hello.gif', label: 'HELLO', hindi: 'नमस्ते' },
  { phrase: 'namaste', gif: 'hello.gif', label: 'HELLO', hindi: 'नमस्ते' },
  { phrase: 'namaskar', gif: 'hello.gif', label: 'HELLO', hindi: 'नमस्कार' },
  { phrase: 'help', gif: 'shall I help you.gif', label: 'HELP', hindi: 'मदद' },
  { phrase: 'madad', gif: 'shall I help you.gif', label: 'HELP', hindi: 'मदद' },
  { phrase: 'sorry', gif: 'i am sorry.gif', label: 'SORRY', hindi: 'माफ कीजिए' },
  { phrase: 'toilet', gif: 'toilet.gif', label: 'TOILET', hindi: 'शौचालय' },
  { phrase: 'bathroom', gif: 'where is the bathroom.gif', label: 'BATHROOM', hindi: 'शौचालय' },
  { phrase: 'shauchalay', gif: 'where is the bathroom.gif', label: 'BATHROOM', hindi: 'शौचालय' },
  { phrase: 'clinic', gif: 'cilinic.gif', label: 'CLINIC', hindi: 'क्लिनिक' },
  { phrase: 'temple', gif: 'temple.gif', label: 'TEMPLE', hindi: 'मंदिर' },
  { phrase: 'mandir', gif: 'temple.gif', label: 'TEMPLE', hindi: 'मंदिर' },
  { phrase: 'church', gif: 'church.gif', label: 'CHURCH', hindi: 'चर्च' },
  { phrase: 'job', gif: 'job.gif', label: 'JOB', hindi: 'नौकरी' },
  { phrase: 'naukri', gif: 'job.gif', label: 'JOB', hindi: 'नौकरी' },
  { phrase: 'shop', gif: 'shop.gif', label: 'SHOP', hindi: 'दुकान' },
  { phrase: 'dukan', gif: 'shop.gif', label: 'SHOP', hindi: 'दुकान' },
  { phrase: 'bridge', gif: 'bridge.gif', label: 'BRIDGE', hindi: 'पुल' },
  { phrase: 'pul', gif: 'bridge.gif', label: 'BRIDGE', hindi: 'पुल' },
  { phrase: 'village', gif: 'village.gif', label: 'VILLAGE', hindi: 'गाँव' },
  { phrase: 'gaon', gif: 'village.gif', label: 'VILLAGE', hindi: 'गाँव' },
  { phrase: 'cat', gif: 'cat.gif', label: 'CAT', hindi: 'बिल्ली' },
  { phrase: 'billi', gif: 'cat.gif', label: 'CAT', hindi: 'बिल्ली' },
  { phrase: 'mango', gif: 'mango.gif', label: 'MANGO', hindi: 'आम' },
  { phrase: 'aam', gif: 'mango.gif', label: 'MANGO', hindi: 'आम' },
  { phrase: 'banana', gif: 'banana.gif', label: 'BANANA', hindi: 'केला' },
  { phrase: 'kela', gif: 'banana.gif', label: 'BANANA', hindi: 'केला' },
  { phrase: 'grapes', gif: 'grapes.gif', label: 'GRAPES', hindi: 'अंगूर' },
  { phrase: 'angoor', gif: 'grapes.gif', label: 'GRAPES', hindi: 'अंगूर' },
  { phrase: 'tomato', gif: 'tomato.gif', label: 'TOMATO', hindi: 'टमाटर' },
  { phrase: 'tamatar', gif: 'tomato.gif', label: 'TOMATO', hindi: 'टमाटर' },
  { phrase: 'all', gif: 'all.gif', label: 'ALL', hindi: 'सभी' },
  { phrase: 'sab', gif: 'all.gif', label: 'ALL', hindi: 'सब' },
  { phrase: 'address', gif: 'address.gif', label: 'ADDRESS', hindi: 'पता' },
  { phrase: 'pata', gif: 'address.gif', label: 'ADDRESS', hindi: 'पता' },

  // Days & Months
  { phrase: 'saturday', gif: 'saturday.gif', label: 'SATURDAY', hindi: 'शनिवार' },
  { phrase: 'shanivar', gif: 'saturday.gif', label: 'SATURDAY', hindi: 'शनिवार' },
  { phrase: 'sunday', gif: 'saturday.gif', label: 'SUNDAY', hindi: 'रविवार' },
  { phrase: 'tuesday', gif: 'tuesday.gif', label: 'TUESDAY', hindi: 'मंगलवार' },
  { phrase: 'mangalvar', gif: 'tuesday.gif', label: 'TUESDAY', hindi: 'मंगलवार' },
  { phrase: 'wednesday', gif: 'wednesday.gif', label: 'WEDNESDAY', hindi: 'बुधवार' },
  { phrase: 'budhvar', gif: 'wednesday.gif', label: 'WEDNESDAY', hindi: 'बुधवार' },
  { phrase: 'thursday', gif: 'thursday.gif', label: 'THURSDAY', hindi: 'गुरुवार' },
  { phrase: 'guruvar', gif: 'thursday.gif', label: 'THURSDAY', hindi: 'गुरुवार' },
  { phrase: 'may', gif: 'may.gif', label: 'MAY', hindi: 'मई' },
  { phrase: 'june', gif: 'june.gif', label: 'JUNE', hindi: 'जून' },
  { phrase: 'july', gif: 'july.gif', label: 'JULY', hindi: 'जुलाई' },
  { phrase: 'august', gif: 'august.gif', label: 'AUGUST', hindi: 'अगस्त' },
  { phrase: 'december', gif: 'december.gif', label: 'DECEMBER', hindi: 'दिसंबर' },

  // Indian Cities & States
  { phrase: 'mumbai', gif: 'mumbai.gif', label: 'MUMBAI', hindi: 'मुंबई' },
  { phrase: 'bombay', gif: 'mumbai.gif', label: 'MUMBAI', hindi: 'मुंबई' },
  { phrase: 'pune', gif: 'pune.gif', label: 'PUNE', hindi: 'पुणे' },
  { phrase: 'nagpur', gif: 'nagpur.gif', label: 'NAGPUR', hindi: 'नागपुर' },
  { phrase: 'hyderabad', gif: 'hyderabad.gif', label: 'HYDERABAD', hindi: 'हैदराबाद' },
  { phrase: 'banglore', gif: 'banglore.gif', label: 'BENGALURU', hindi: 'बेंगलुरु' },
  { phrase: 'bengaluru', gif: 'banglore.gif', label: 'BENGALURU', hindi: 'बेंगलुरु' },
  { phrase: 'banaras', gif: 'banaras.gif', label: 'VARANASI', hindi: 'वाराणसी' },
  { phrase: 'varanasi', gif: 'banaras.gif', label: 'VARANASI', hindi: 'वाराणसी' },
  { phrase: 'ahemdabad', gif: 'ahemdabad.gif', label: 'AHMEDABAD', hindi: 'अहमदाबाद' },
  { phrase: 'punjab', gif: 'punjab.gif', label: 'PUNJAB', hindi: 'पंजाब' },
  { phrase: 'kerala', gif: 'kerala.gif', label: 'KERALA', hindi: 'केरल' },
  { phrase: 'karnataka', gif: 'karnataka.gif', label: 'KARNATAKA', hindi: 'कर्नाटक' },
  { phrase: 'assam', gif: 'assam.gif', label: 'ASSAM', hindi: 'असम' },

  // Festivals, Culture & Nations
  { phrase: 'christmas', gif: 'christmas.gif', label: 'CHRISTMAS', hindi: 'क्रिसमस' },
  { phrase: 'merry christmas', gif: 'christmas.gif', label: 'MERRY CHRISTMAS', hindi: 'क्रिसमस की शुभकामनाएं' },
  { phrase: 'dasara', gif: 'dasara.gif', label: 'DUSSEHRA', hindi: 'दशहरा' },
  { phrase: 'dussehra', gif: 'dasara.gif', label: 'DUSSEHRA', hindi: 'दशहरा' },
  { phrase: 'dashahara', gif: 'dasara.gif', label: 'DUSSEHRA', hindi: 'दशहरा' },
  { phrase: 'hindu', gif: 'hindu.gif', label: 'HINDU', hindi: 'हिन्दू' },
  { phrase: 'hinduism', gif: 'hindu.gif', label: 'HINDU', hindi: 'हिन्दू' },
  { phrase: 'krishna', gif: 'krishna.gif', label: 'LORD KRISHNA', hindi: 'भगवान कृष्ण' },
  { phrase: 'lord krishna', gif: 'krishna.gif', label: 'LORD KRISHNA', hindi: 'श्री कृष्ण' },
  { phrase: 'shri krishna', gif: 'krishna.gif', label: 'LORD KRISHNA', hindi: 'श्री कृष्ण' },
  { phrase: 'pakistan', gif: 'pakistan.gif', label: 'PAKISTAN', hindi: 'पाकिस्तान' },
  { phrase: 'usa', gif: 'usa.gif', label: 'USA / AMERICA', hindi: 'अमेरिका' },
  { phrase: 'america', gif: 'usa.gif', label: 'USA / AMERICA', hindi: 'अमेरिका' },
  { phrase: 'united states', gif: 'usa.gif', label: 'USA / AMERICA', hindi: 'अमेरिका' },
  { phrase: 'mile', gif: 'mile.gif', label: 'MILE', hindi: 'मील' },
  { phrase: 'miles', gif: 'mile.gif', label: 'MILE', hindi: 'मील' },
];

/**
 * Greedily parses an input text into a sequence of authentic sign tokens.
 * Multi-word phrases match first, followed by single words.
 * Out-of-vocabulary words fall back to individual fingerspelling letters.
 */
export const parseSpeechToSignTokens = (text) => {
  if (!text || !text.trim()) {
    const defaultDur = signDurations['hello.gif'] || 2300;
    return [{
      type: 'gif',
      filename: 'hello.gif',
      src: '/signs/hello.gif',
      label: 'HELLO',
      hindi: 'नमस्ते',
      duration_ms: defaultDur,
      isLetter: false
    }];
  }

  let cleanText = text
    .toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?'"।]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const tokens = [];
  const stopWords = new Set(['is', 'am', 'are', 'the', 'a', 'an', 'to', 'of', 'in', 'hai', 'hain', 'ho', 'ki', 'ka', 'ke']);

  // Sort by phrase length descending
  const sortedDict = [...ISL_ENTRIES].sort((a, b) => b.phrase.length - a.phrase.length);

  while (cleanText.length > 0) {
    let matched = false;

    // 1. Try phrase match
    for (const entry of sortedDict) {
      if (cleanText.startsWith(entry.phrase)) {
        const dur = signDurations[entry.gif] || 2500;
        tokens.push({
          type: 'gif',
          filename: entry.gif,
          src: `/signs/${entry.gif}`,
          label: entry.label,
          hindi: entry.hindi,
          duration_ms: dur,
          isLetter: false
        });
        cleanText = cleanText.slice(entry.phrase.length).trim();
        matched = true;
        break;
      }
    }

    if (!matched) {
      // 2. Consume first word
      const spaceIdx = cleanText.indexOf(' ');
      const word = (spaceIdx === -1 ? cleanText : cleanText.slice(0, spaceIdx)).trim();
      cleanText = (spaceIdx === -1 ? '' : cleanText.slice(spaceIdx)).trim();

      if (word && !stopWords.has(word)) {
        // Single word match
        const singleMatch = sortedDict.find((p) => p.phrase === word);
        if (singleMatch) {
          const dur = signDurations[singleMatch.gif] || 2500;
          tokens.push({
            type: 'gif',
            filename: singleMatch.gif,
            src: `/signs/${singleMatch.gif}`,
            label: singleMatch.label,
            hindi: singleMatch.hindi,
            duration_ms: dur,
            isLetter: false
          });
        } else {
          // 3. Out-of-vocabulary: Fingerspell word letter by letter using real sign demonstration GIFs
          const letters = word.slice(0, 8).split('');
          letters.forEach((char) => {
            if (char >= 'a' && char <= 'z') {
              const letterDur = signDurations[`${char}.gif`] || 850;
              tokens.push({
                type: 'letter',
                filename: `${char}.gif`,
                src: `/letters/${char}.gif`,
                label: char.toUpperCase(),
                duration_ms: letterDur,
                isLetter: true
              });
            }
          });
        }
      }
    }
  }

  return tokens.length > 0
    ? tokens
    : [{
        type: 'gif',
        filename: 'hello.gif',
        src: '/signs/hello.gif',
        label: 'HELLO',
        hindi: 'नमस्ते',
        duration_ms: signDurations['hello.gif'] || 2300,
        isLetter: false
      }];
};
