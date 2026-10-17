// Master Multilingual Dictionary & Translation Engine
// Supports 15 Indian & Global Languages with BCP-47 speech recognition and synthesis codes

export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', native: 'English', flag: '🇬🇧', speechLocale: 'en-US' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी', flag: '🇮🇳', speechLocale: 'hi-IN' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা', flag: '🇮🇳', speechLocale: 'bn-IN' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்', flag: '🇮🇳', speechLocale: 'ta-IN' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు', flag: '🇮🇳', speechLocale: 'te-IN' },
  { code: 'mr', name: 'Marathi', native: 'मराठी', flag: '🇮🇳', speechLocale: 'mr-IN' },
  { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી', flag: '🇮🇳', speechLocale: 'gu-IN' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ', flag: '🇮🇳', speechLocale: 'kn-IN' },
  { code: 'ml', name: 'Malayalam', native: 'മലയാളം', flag: '🇮🇳', speechLocale: 'ml-IN' },
  { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ', flag: '🇮🇳', speechLocale: 'pa-IN' },
  { code: 'es', name: 'Spanish', native: 'Español', flag: '🇪🇸', speechLocale: 'es-ES' },
  { code: 'fr', name: 'French', native: 'Français', flag: '🇫🇷', speechLocale: 'fr-FR' },
  { code: 'de', name: 'German', native: 'Deutsch', flag: '🇩🇪', speechLocale: 'de-DE' },
  { code: 'ar', name: 'Arabic', native: 'العربية', flag: '🇸🇦', speechLocale: 'ar-SA' },
  { code: 'ja', name: 'Japanese', native: '日本語', flag: '🇯🇵', speechLocale: 'ja-JP' },
];

// Offline high-frequency conversational phrase matrix (instant 0ms response)
export const OFFLINE_PHRASES = [
  {
    en: 'Hello, how are you?',
    hi: 'नमस्ते, आप कैसे हैं?',
    bn: 'নমস্কার, আপনি কেমন আছেন?',
    ta: 'வணக்கம், நீங்கள் எப்படி இருக்கிறீர்கள்?',
    te: 'నమస్కారం, మీరు ఎలా ఉన్నారు?',
    mr: 'नमस्कार, तुम्ही कसे आहात?',
    gu: 'નમસ્તે, તમે કેમ છો?',
    kn: 'ನಮಸ್ಕಾರ, ನೀವು ಹೇಗಿದ್ದೀರಿ?',
    ml: 'നമസ്കാരം, സുഖമാണോ?',
    pa: 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ, ਤੁਸੀਂ ਕਿਵੇਂ ਹੋ?',
    es: '¡Hola! ¿Cómo estás?',
    fr: 'Bonjour, comment allez-vous ?',
    de: 'Hallo, wie geht es dir?',
    ar: 'مرحبا، كيف حالك؟',
    ja: 'こんにちは、お元気ですか？',
  },
  {
    en: 'My name is John. Nice to meet you.',
    hi: 'मेरा नाम जॉन है। आपसे मिलकर खुशी हुई।',
    bn: 'আমার নাম জন। আপনার সাথে দেখা করে ভালো লাগলো।',
    ta: 'என் பெயர் ஜான். உங்களை சந்தித்ததில் மகிழ்ச்சி.',
    te: 'నా పేరు జాన్. మిమ్మల్ని కలవడం సంతోషంగా ఉంది.',
    mr: 'माझे नाव जॉन आहे. तुम्हाला भेटून आनंद झाला.',
    gu: 'મારું નામ જોન છે. તમને મળીને આનંદ થયો.',
    kn: 'ನನ್ನ ಹೆಸರು ಜಾನ್. ನಿಮ್ಮನ್ನು ಭೇಟಿಯಾಗಿದ್ದು ಸಂತೋಷ.',
    ml: 'എന്റെ പേര് ജോൺ. കണ്ടതിൽ സന്തോഷം.',
    pa: 'ਮੇਰਾ ਨਾਮ ਜੌਨ ਹੈ। ਤੁਹਾਨੂੰ ਮਿਲ ਕੇ ਖੁਸ਼ੀ ਹੋਈ।',
    es: 'Mi nombre es John. Encantado de conocerte.',
    fr: 'Je m’appelle John. Ravi de vous rencontrer.',
    de: 'Mein Name ist John. Schön, Sie kennenzulernen.',
    ar: 'اسمي جون. تشرفت بمعرفتك.',
    ja: '私の名前はジョンです。はじめまして。',
  },
  {
    en: 'Where is the nearest hospital or doctor?',
    hi: 'निकटतम अस्पताल या डॉक्टर कहाँ है?',
    bn: 'নিকটতম হাসপাতাল বা ডাক্তার কোথায়?',
    ta: 'அருகிலுள்ள மருத்துவமனை அல்லது மருத்துவர் எங்கே?',
    te: 'సమీపంలోని ఆసుపత్రి లేదా వైద్యుడు ఎక్కడ ఉన్నారు?',
    mr: 'जवळचे रुग्णालय किंवा डॉक्टर कुठे आहे?',
    gu: 'નજીકની હોસ્પિટલ અથવા ડૉક્ટર ક્યાં છે?',
    kn: 'ಹತ್ತಿರದ ಆಸ್ಪತ್ರೆ ಅಥವಾ ವೈದ್ಯರು ಎಲ್ಲಿದ್ದಾರೆ?',
    ml: 'ഏറ്റവും അടുത്തുള്ള ആശുപത്രി അല്ലെങ്കിൽ ഡോക്ടർ എവിടെയാണ്?',
    pa: 'ਸਭ ਤੋਂ ਨੇੜੇ ਦਾ ਹਸਪਤਾਲ ਜਾਂ ਡਾਕਟਰ ਕਿੱਥੇ ਹੈ?',
    es: '¿Dónde está el hospital o médico más cercano?',
    fr: 'Où est l’hôpital ou le médecin le plus proche ?',
    de: 'Wo ist das nächste Krankenhaus oder der nächste Arzt?',
    ar: 'أين أقرب مستشفى أو طبيب؟',
    ja: '一番近い病院や医師はどこですか？',
  },
  {
    en: 'Can you please help me?',
    hi: 'क्या आप कृपया मेरी मदद कर सकते हैं?',
    bn: 'আপনি কি দয়া করে আমাকে সাহায্য করতে পারেন?',
    ta: 'தயவுசெய்து எனக்கு உதவ முடியுமா?',
    te: 'దయచేసి నాకు సహాయం చేయగలరా?',
    mr: 'तुम्ही मला कृपया मदत करू शकता का?',
    gu: 'શું તમે કૃપા કરીને મારી મદદ કરી શકો છો?',
    kn: 'ದಯವಿಟ್ಟು ನನಗೆ ಸಹಾಯ ಮಾಡಬಹುದೇ?',
    ml: 'ദയവായി എന്നെ സഹായിക്കാമോ?',
    pa: 'ਕੀ ਤੁਸੀਂ ਕਿਰਪਾ ਕਰਕੇ ਮੇਰੀ ਮਦਦ ਕਰ ਸਕਦੇ ਹੋ?',
    es: '¿Puedes ayudarme, por favor?',
    fr: 'Pouvez-vous m’aider, s’il vous plaît ?',
    de: 'Können Sie mir bitte helfen?',
    ar: 'هل يمكنك مساعدتي من فضلك؟',
    ja: '助けていただけますか？',
  },
  {
    en: 'Please speak slowly, I am using a live translator.',
    hi: 'कृपया धीरे बोलें, मैं लाइव अनुवादक का उपयोग कर रहा हूँ।',
    bn: 'দয়া করে আস্তে কথা বলুন, আমি লাইভ অনুবাদক ব্যবহার করছি।',
    ta: 'தயவுசெய்து மெதுவாக பேசுங்கள், நான் மொழிபெயர்ப்பாளரைப் பயன்படுத்துகிறேன்.',
    te: 'దయచేసి నెమ్మదిగా మాట్లాడండి, నేను లైవ్ అనువాదకుడిని ఉపయోగిస్తున్నాను.',
    mr: 'कृपया हळू बोला, मी थेट अनुवादक वापरत आहे.',
    gu: 'કૃપા કરીને ધીમે બોલો, હું લાઇવ અનુવાદકનો ઉપયોગ કરું છું.',
    kn: 'ದಯವಿಟ್ಟು ನಿಧಾನವಾಗಿ ಮಾತನಾಡಿ, ನಾನು ಲೈವ್ ಅನುವಾದಕವನ್ನು ಬಳಸುತ್ತಿದ್ದೇನೆ.',
    ml: 'ദയവായി പതുക്കെ സംസാരിക്കൂ, ഞാൻ ഒരു ലൈവ് വിവർത്തകൻ ഉപയോഗിക്കുന്നു.',
    pa: 'ਕਿਰਪਾ ਕਰਕੇ ਹੌਲੀ ਬੋਲੋ, ਮੈਂ ਲਾਈਵ ਅਨੁਵਾਦਕ ਦੀ ਵਰਤੋਂ ਕਰ ਰਿਹਾ ਹਾਂ।',
    es: 'Por favor hable despacio, estoy usando un traductor en vivo.',
    fr: 'Veuillez parler lentement, j’utilise un traducteur en direct.',
    de: 'Bitte sprechen Sie langsam, ich verwende einen Live-Übersetzer.',
    ar: 'يرجى التحدث ببطء، أنا أستخدم مترجماً مباشراً.',
    ja: 'ゆっくり話してください。ライブ翻訳機を使っています。',
  },
  {
    en: 'Where is the bathroom or washroom?',
    hi: 'शौचालय या वॉशरूम कहाँ है?',
    bn: 'বাথরুম বা শৌচাগার কোথায়?',
    ta: 'கழிப்பறை எங்கே உள்ளது?',
    te: 'వాష్‌రూమ్ లేదా బాత్రూమ్ ఎక్కడ ఉంది?',
    mr: 'शौचालय किंवा वॉशरूम कुठे आहे?',
    gu: 'શૌચાલય ક્યાં છે?',
    kn: 'ಶೌಚಾಲಯ ಎಲ್ಲಿದೆ?',
    ml: 'ടോയ്‌ലറ്റ് എവിടെയാണ്?',
    pa: 'ਗੁਸਲਖ਼ਾਨਾ ਕਿੱਥੇ ਹੈ?',
    es: '¿Dónde está el baño?',
    fr: 'Où sont les toilettes ?',
    de: 'Wo ist die Toilette?',
    ar: 'أين الحمام؟',
    ja: 'お手洗いはどこですか？',
  },
  {
    en: 'Thank you very much for your kindness.',
    hi: 'आपकी दयालुता के लिए बहुत-बहुत धन्यवाद।',
    bn: 'আপনার সহৃদয়তার জন্য অনেক ধন্যবাদ।',
    ta: 'உங்கள் அன்பிற்கு மிக்க நன்றி.',
    te: 'మీ దయకు చాలా ధన్యవాదాలు.',
    mr: 'तुमच्या दयाळूपणासाठी खूप खूप धन्यवाद.',
    gu: 'તમારી દયા બદલ ખૂબ ખૂબ આભાર.',
    kn: 'ನಿಮ್ಮ ದಯೆಗೆ ತುಂಬಾ ಧನ್ಯವಾದಗಳು.',
    ml: 'നിങ്ങളുടെ ദയയ്ക്ക് വളരെ നന്ദി.',
    pa: 'ਤੁਹਾਡੀ ਦਿਆਲਤਾ ਲਈ ਬਹੁਤ ਬਹੁਤ ਧੰਨਵਾਦ।',
    es: 'Muchas gracias por su amabilidad.',
    fr: 'Merci beaucoup pour votre gentillesse.',
    de: 'Vielen Dank für Ihre Freundlichkeit.',
    ar: 'شكرا جزيلا على لطفك.',
    ja: '親切にしていただき、どうもありがとうございます。',
  },
  {
    en: 'I do not understand. Could you repeat that?',
    hi: 'मुझे समझ नहीं आया। क्या आप इसे दोहरा सकते हैं?',
    bn: 'আমি বুঝতে পারছি না। আপনি কি পুনরাবৃত্তি করতে পারেন?',
    ta: 'எனக்கு புரியவில்லை. மீண்டும் சொல்ல முடியுமா?',
    te: 'నాకు అర్థం కాలేదు. మళ్ళీ చెప్పగలరా?',
    mr: 'मला समजले नाही. तुम्ही पुन्हा सांगू शकता का?',
    gu: 'મને સમજાયું નથી. શું તમે ફરીથી કહી શકો છો?',
    kn: 'ನನಗೆ ಅರ್ಥವಾಗುತ್ತಿಲ್ಲ. ಪುನರಾವರ್ತಿಸಬಹುದೇ?',
    ml: 'എനിക്ക് മനസ്സിലായില്ല. ഒന്നുകൂടി പറയാമോ?',
    pa: 'ਮੈਨੂੰ ਸਮਝ ਨਹੀਂ ਆਇਆ। ਕੀ ਤੁਸੀਂ ਦੁਹਰਾ ਸਕਦੇ ਹੋ?',
    es: 'No entiendo. ¿Podrías repetir eso?',
    fr: 'Je ne comprends pas. Pourriez-vous répéter ?',
    de: 'Ich verstehe nicht. Könnten Sie das wiederholen?',
    ar: 'أنا لا أفهم. هل يمكنك تكرار ذلك؟',
    ja: '理解できませんでした。もう一度言っていただけますか？',
  },
  {
    en: 'How much does this cost?',
    hi: 'इसकी कीमत कितनी है?',
    bn: 'এটার দাম কত?',
    ta: 'இதன் விலை என்ன?',
    te: 'దీని ధర ఎంత?',
    mr: 'याची किंमत किती आहे?',
    gu: 'આની કિંમત કેટલી છે?',
    kn: 'ಇದರ ಬೆಲೆ ಎಷ್ಟು?',
    ml: 'ഇതിന് എത്ര രൂപയാണ്?',
    pa: 'ਇਸਦੀ ਕੀਮਤ ਕਿੰਨੀ ਹੈ?',
    es: '¿Cuánto cuesta esto?',
    fr: 'Combien cela coûte-t-il ?',
    de: 'Wie viel kostet das?',
    ar: 'كم سعر هذا؟',
    ja: 'これはいくらですか？',
  },
  {
    en: 'Yes',
    hi: 'हाँ',
    bn: 'হ্যাঁ',
    ta: 'ஆம்',
    te: 'అవును',
    mr: 'होय',
    gu: 'હા',
    kn: 'ಹೌದು',
    ml: 'അതെ',
    pa: 'ਹਾਂ',
    es: 'Sí',
    fr: 'Oui',
    de: 'Ja',
    ar: 'نعم',
    ja: 'はい',
  },
  {
    en: 'No',
    hi: 'नहीं',
    bn: 'না',
    ta: 'இல்லை',
    te: 'కాదు',
    mr: 'नाही',
    gu: 'ના',
    kn: 'ಇಲ್ಲ',
    ml: 'അല്ല',
    pa: 'ਨਹੀਂ',
    es: 'No',
    fr: 'Non',
    de: 'Nein',
    ar: 'لا',
    ja: 'いいえ',
  },
  {
    en: 'Goodbye, have a safe journey!',
    hi: 'अलविदा, आपकी यात्रा मंगलमय हो!',
    bn: 'বিদায়, আপনার শুভ যাত্রা কামনা করি!',
    ta: 'வணக்கம், உங்கள் பயணம் இனிதாக அமையட்டும்!',
    te: 'వీడ్కోలు, మీ ప్రయాణం సురక్షితంగా సాగాలి!',
    mr: 'निरोप, तुमचा प्रवास सुखकर होवो!',
    gu: 'આવજો, તમારી યાત્રા સુખદ રહે!',
    kn: 'ವಿದಾಯ, ನಿಮ್ಮ ಪ್ರಯಾಣ ಸುಖಕರವಾಗಿರಲಿ!',
    ml: 'വിട, യാത്ര സുരക്ഷിതമായിരിക്കട്ടെ!',
    pa: 'ਅਲਵਿਦਾ, ਤੁਹਾਡੀ ਯਾਤਰਾ ਸੁਖਾਲੀ ਹੋਵੇ!',
    es: '¡Adiós, que tengas un buen viaje!',
    fr: 'Au revoir, bon voyage !',
    de: 'Auf Wiedersehen, gute Reise!',
    ar: 'وداعاً، أتمنى لك رحلة آمنة!',
    ja: 'さようなら、よい旅を！',
  },
];

// Offline common vocabulary lookup
export const VOCABULARY_MAP = {
  water: { hi: 'पानी', bn: 'জল', ta: 'தண்ணீர்', te: 'నీరు', mr: 'पाणी', es: 'agua', fr: 'eau' },
  food: { hi: 'खाना', bn: 'খাবার', ta: 'உணவு', te: 'ఆహారం', mr: 'अन्न', es: 'comida', fr: 'nourriture' },
  help: { hi: 'मदद', bn: 'সাহায্য', ta: 'உதவி', te: 'సహాయం', mr: 'मदत', es: 'ayuda', fr: 'aide' },
  emergency: { hi: 'आपातकाल', bn: 'জরুরী', ta: 'அவசரம்', te: 'అత్యవసరం', mr: 'आणीबाणी', es: 'emergencia', fr: 'urgence' },
  police: { hi: 'पुलिस', bn: 'পুলিশ', ta: 'காவல்துறை', te: 'పోలీసులు', mr: 'पोलीस', es: 'policía', fr: 'police' },
  doctor: { hi: 'डॉक्टर', bn: 'ডাক্তার', ta: 'மருத்துவர்', te: 'డాక్టర్', mr: 'डॉक्टर', es: 'médico', fr: 'médecin' },
  hospital: { hi: 'अस्पताल', bn: 'হাসপাতাল', ta: 'மருத்துவமனை', te: 'ఆసుపత్రి', mr: 'रुग्णालय', es: 'hospital', fr: 'hôpital' },
  medicine: { hi: 'दवा', bn: 'ঔষধ', ta: 'மருந்து', te: 'మందు', mr: 'औषध', es: 'medicina', fr: 'médicament' },
  ticket: { hi: 'टिकट', bn: 'টিকিট', ta: 'டிக்கெட்', te: 'టికెట్', mr: 'तिकीट', es: 'billete', fr: 'billet' },
  station: { hi: 'स्टेशन', bn: 'স্টেশন', ta: 'நிலையம்', te: 'స్టేషన్', mr: 'स्थानक', es: 'estación', fr: 'gare' },
};

/**
 * Fast Bidirectional Translation with Smart Fallback Engine:
 * 1. Checks exact match in high-accuracy offline conversational matrix.
 * 2. Attempts high-speed free translation API with timeout.
 * 3. Falls back to vocabulary mapping & clean linguistic presentation.
 */
export async function translateText(text, fromCode, toCode) {
  if (!text || !text.trim()) return '';
  if (fromCode === toCode) return text.trim();

  const cleanQuery = text.trim().toLowerCase();

  // 1. Direct match in curated phrases matrix
  for (const item of OFFLINE_PHRASES) {
    const srcVal = item[fromCode]?.toLowerCase();
    if (srcVal && (srcVal === cleanQuery || cleanQuery.includes(srcVal) || srcVal.includes(cleanQuery))) {
      if (item[toCode]) {
        return item[toCode];
      }
    }
  }

  // 2. Vocabulary match
  if (VOCABULARY_MAP[cleanQuery] && VOCABULARY_MAP[cleanQuery][toCode]) {
    return VOCABULARY_MAP[cleanQuery][toCode];
  }

  // 3. Online Live Translation API
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const langPair = `${fromCode}|${toCode}`;
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
      text
    )}&langpair=${encodeURIComponent(langPair)}`;

    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (data?.responseData?.translatedText) {
        const result = data.responseData.translatedText;
        // Check if API returned an error message as translated text
        if (!result.includes('MYMEMORY WARNING') && !result.includes('QUERY LENGTH LIMIT')) {
          return result;
        }
      }
    }
  } catch (err) {
    console.warn('Online translation API unavailable or timed out:', err.message);
  }

  // 4. Fallback formatting
  return text;
}
