import { BookInfo, ProfileFact, VolumeInfo } from '../types/hadith';

export const AUTHOR_PROFILE_FACTS: ProfileFact[] = [
  { label: 'Full Name', value: 'Al-Jami al-Sahih (Sahih Muslim)' },
  { label: 'Author', value: 'Imam Muslim bin Hajjaj Al-Nishapuri' },
  { label: 'Born', value: '204 Hijri / 820 AD in Nishapur, Khorasan (Iran)' },
  { label: 'Died', value: '261 Hijri / 875 AD in Nishapur' },
  { label: 'Language', value: 'Arabic Original · Urdu Translation Available' },
  { label: 'Status', value: 'Second Most Authentic Book After Quran, Along with Sahih Bukhari' },
  { label: 'Total Hadiths', value: '7,563 With Repetition · 3,033 Without Repetition' },
  { label: 'Structure', value: '7 Volumes · 54 Books · More Than 1,200 Chapters' },
  { label: 'Compilation Period', value: '15 Years (Selected from 300,000 Hadiths)' },
  { label: 'Teachers', value: 'Imam Muhammad bin Ismail Al-Bukhari, Imam Ahmad bin Hanbal, Ishaq bin Rahwayh' },
  { label: 'Students', value: 'Imam Al-Tirmidhi, Imam Abu Dawood, Imam Ibn Majah' },
];

export const INTRODUCTION_PARAGRAPHS: string[] = [
  'Sahih Muslim is a monumental collection of Prophetic traditions compiled by Imam Muslim bin Hajjaj Al-Nishapuri (204–261 AH). Over fifteen years of disciplined scholarship and travel across Iraq, the Hijaz, Syria, and Egypt, Imam Muslim examined nearly 300,000 narrations from eminent teachers and selected only the most rigorously authenticated traditions.',
  'Not a single weak (Daif) narration was admitted into the work. Every Hadith included in Sahih Muslim possesses a complete, unbroken chain of trustworthy narrators (Isnad) free from hidden defects. Imam Muslim arranged the corpus systematically by legal and spiritual themes so students and scholars could readily consult rulings on Faith, Purification, Prayer, Zakat, Fasting, Hajj, Marriage, Commerce, Ethics, and the Hereafter.',
];

export const IMAM_MUSLIM_METHOD: { number: string; title: string; detail: string }[] = [
  {
    number: '01',
    title: 'Trustworthy Narrators Only',
    detail: 'He only accepted Hadith from upright, accurate narrators known for integrity and precision of memory.',
  },
  {
    number: '02',
    title: 'Verified Contemporaneity',
    detail: 'He checked that each narrator lived in the same era and was able to meet the next narrator in the chain.',
  },
  {
    number: '03',
    title: 'Unbroken Continuous Chain',
    detail: 'He verified that every link in the Isnad remained continuous from the compiler back to the Prophet (Peace Be Upon Him) without any break.',
  },
  {
    number: '04',
    title: 'Freedom From Hidden Defects',
    detail: 'He excluded any Hadith containing a subtle or hidden flaw (Ilah) in text or transmission.',
  },
  {
    number: '05',
    title: 'Unified Thematic Grouping',
    detail: 'He placed all variant chains and wording versions of a single Hadith together in one location for immediate scholarly comparison.',
  },
  {
    number: '06',
    title: 'Pure Textual Presentation',
    detail: 'Unlike Imam Al-Bukhari, he did not insert his own chapter headings; later master commentators such as Imam Al-Nawawi supplied the chapter titles.',
  },
];

export const IMPORTANCE_SUMMARY =
  'Recognized universally alongside Sahih Al-Bukhari as one of the Sahihayn—the two most authentic books after the Noble Quran—Sahih Muslim serves as a foundational pillar for Islamic jurisprudence (Fiqh), creed (Aqidah), worship (Ibadat), and moral character. It preserves the lived Sunnah of Prophet Muhammad (Peace Be Upon Him) and provides essential commentary that clarifies the verses of the Quran.';

export const VOLUMES: VolumeInfo[] = [
  { number: 1, roman: 'Vol. I', title: 'Faith, Purification & Daily Prayer', urduTitle: 'جلد اول: ایمان، طہارت اور نماز', bookRange: 'Books 1–6', hadithRange: '1–1750' },
  { number: 2, roman: 'Vol. II', title: 'Congregational Prayers, Zakat & Fasting', urduTitle: 'جلد دوم: جمعہ، عیدین، جنازہ، زکوٰۃ اور روزہ', bookRange: 'Books 7–14', hadithRange: '1751–2495' },
  { number: 3, roman: 'Vol. III', title: 'Pilgrimage, Marriage & Family Law', urduTitle: 'جلد سوم: حج، نکاح، رضاعت اور طلاق', bookRange: 'Books 15–20', hadithRange: '2496–3465' },
  { number: 4, roman: 'Vol. IV', title: 'Transactions, Inheritance & Judiciary', urduTitle: 'جلد چہارم: بیوع، وراثت، وصیت اور قضا', bookRange: 'Books 21–31', hadithRange: '3466–4145' },
  { number: 5, roman: 'Vol. V', title: 'Governance, Warfare, Diet & Attire', urduTitle: 'جلد پنجم: جہاد، امارت، شکار، مشروبات اور لباس', bookRange: 'Books 32–38', hadithRange: '4146–5260' },
  { number: 6, roman: 'Vol. VI', title: 'Etiquette, Virtues & Companions', urduTitle: 'جلد ششم: سلام، فضائل، صحابہ اور صلہ رحمی', bookRange: 'Books 39–45', hadithRange: '5261–6355' },
  { number: 7, roman: 'Vol. VII', title: 'Destiny, Knowledge, Repentance & Eschatology', urduTitle: 'جلد ہفتم: تقدیر، علم، ذکر، توبہ، جنت اور فتن', bookRange: 'Books 46–54', hadithRange: '6356–7563' },
];

export const BOOKS_54: BookInfo[] = [
  { id: 1, volume: 1, translitTitle: 'Kitab Al-Iman', englishTitle: 'Book of Faith', arabicTitle: 'كتاب الإيمان', urduTitle: 'کتاب الایمان', totalHadiths: 458, startHadith: 1, endHadith: 458, summary: 'Foundations of Islamic belief, the pillars of Islam and Iman, branches of faith, sincerity, and signs of conviction.' },
  { id: 2, volume: 1, translitTitle: 'Kitab Al-Taharah', englishTitle: 'Book of Purification', arabicTitle: 'كتاب الطهارة', urduTitle: 'کتاب الطہارت', totalHadiths: 150, startHadith: 459, endHadith: 608, summary: 'Ritual purity, ablution (Wudu), wiping over leather socks, cleanliness of body and garments.' },
  { id: 3, volume: 1, translitTitle: 'Kitab Al-Hayd', englishTitle: 'Book of Menstruation', arabicTitle: 'كتاب الحيض', urduTitle: 'کتاب الحیض', totalHadiths: 142, startHadith: 609, endHadith: 750, summary: 'Rulings on ritual bath (Ghusl), impurity, menstruation, and dry ablution (Tayammum).' },
  { id: 4, volume: 1, translitTitle: 'Kitab Al-Salah', englishTitle: 'Book of Prayer', arabicTitle: 'كتاب الصلاة', urduTitle: 'کتاب الصلاۃ', totalHadiths: 340, startHadith: 751, endHadith: 1090, summary: 'Call to prayer (Adhan), times and postures of Salah, recitation, bowing, prostration, and congregation.' },
  { id: 5, volume: 1, translitTitle: 'Kitab Al-Masajid', englishTitle: 'Book of Mosques', arabicTitle: 'كتاب المساجد ومواضع الصلاة', urduTitle: 'کتاب المساجد', totalHadiths: 325, startHadith: 1091, endHadith: 1415, summary: 'Sanctity of mosques, etiquette of entering prayer spaces, prayer times, and making up missed prayers.' },
  { id: 6, volume: 1, translitTitle: 'Kitab Salat Al-Musafirin', englishTitle: 'Book of Prayer of Travelers', arabicTitle: 'كتاب صلاة المسافرين وقصرها', urduTitle: 'کتاب صلاۃ المسافرین', totalHadiths: 335, startHadith: 1416, endHadith: 1750, summary: 'Shortening prayers while traveling, night prayers (Tahajjud), Witr, and virtues of reciting the Quran.' },

  { id: 7, volume: 2, translitTitle: 'Kitab Al-Jumuah', englishTitle: 'Book of Friday Prayer', arabicTitle: 'كتاب الجمعة', urduTitle: 'کتاب الجمعہ', totalHadiths: 85, startHadith: 1751, endHadith: 1835, summary: 'Excellence of Friday, preparation and Ghusl, listening to the Khutbah, and the hour of accepted supplication.' },
  { id: 8, volume: 2, translitTitle: 'Kitab Salat Al-Eidain', englishTitle: 'Book of Eid Prayers', arabicTitle: 'كتاب صلاة العيدين', urduTitle: 'کتاب صلاۃ العیدین', totalHadiths: 25, startHadith: 1836, endHadith: 1860, summary: 'Prophetic practice for Eid al-Fitr and Eid al-Adha prayers, sermons, and joyful celebration.' },
  { id: 9, volume: 2, translitTitle: 'Kitab Salat Al-Istisqa', englishTitle: 'Book of Prayer for Rain', arabicTitle: 'كتاب صلاة الاستسقاء', urduTitle: 'کتاب صلاۃ الاستسقاء', totalHadiths: 20, startHadith: 1861, endHadith: 1880, summary: 'Humble supplication and communal prayer seeking rain during times of drought.' },
  { id: 10, volume: 2, translitTitle: 'Kitab Al-Kusuf', englishTitle: 'Book of Eclipse Prayer', arabicTitle: 'كتاب الكسوف', urduTitle: 'کتاب الکسوف', totalHadiths: 32, startHadith: 1881, endHadith: 1912, summary: 'Solar and lunar eclipse prayers as signs of Allah reminding humanity of awe and remembrance.' },
  { id: 11, volume: 2, translitTitle: 'Kitab Al-Janazah', englishTitle: 'Book of Funerals', arabicTitle: 'كتاب الجنائز', urduTitle: 'کتاب الجنائز', totalHadiths: 128, startHadith: 1913, endHadith: 2040, summary: 'Visiting the sick, washing and shrouding the deceased, funeral prayers, burial, and patience in bereavement.' },
  { id: 12, volume: 2, translitTitle: 'Kitab Al-Zakat', englishTitle: 'Book of Zakat', arabicTitle: 'كتاب الزكاة', urduTitle: 'کتاب الزکوٰۃ', totalHadiths: 195, startHadith: 2041, endHadith: 2235, summary: 'Obligatory charity on wealth, crops, and livestock, Sadaqat al-Fitr, and virtues of generosity.' },
  { id: 13, volume: 2, translitTitle: 'Kitab Al-Siyam', englishTitle: 'Book of Fasting', arabicTitle: 'كتاب الصيام', urduTitle: 'کتاب الصیام', totalHadiths: 245, startHadith: 2236, endHadith: 2480, summary: 'Fasting in Ramadan, sighting the crescent, Suhoor, breaking fast, Laylat al-Qadr, and voluntary fasts.' },
  { id: 14, volume: 2, translitTitle: 'Kitab Al-Itikaf', englishTitle: 'Book of Itikaf', arabicTitle: 'كتاب الاعتكاف', urduTitle: 'کتاب الاعتکاف', totalHadiths: 15, startHadith: 2481, endHadith: 2495, summary: 'Spiritual seclusion in the mosque during the last ten nights of Ramadan.' },

  { id: 15, volume: 3, translitTitle: 'Kitab Al-Hajj', englishTitle: 'Book of Hajj', arabicTitle: 'كتاب الحج', urduTitle: 'کتاب الحج', totalHadiths: 585, startHadith: 2496, endHadith: 3080, summary: 'Ihram, Tawaf, Sa’i, standing at Arafat, Muzdalifah, Mina, Umrah, and the sanctity of Makkah and Madinah.' },
  { id: 16, volume: 3, translitTitle: 'Kitab Al-Nikah', englishTitle: 'Book of Marriage', arabicTitle: 'كتاب النكاح', urduTitle: 'کتاب النکاح', totalHadiths: 165, startHadith: 3081, endHadith: 3245, summary: 'Encouragement of marriage, consent, dowry (Mahr), wedding feast (Walimah), and mutual spousal rights.' },
  { id: 17, volume: 3, translitTitle: 'Kitab Al-Rada', englishTitle: 'Book of Breastfeeding', arabicTitle: 'كتاب الرضاع', urduTitle: 'کتاب الرضاع', totalHadiths: 78, startHadith: 3246, endHadith: 3323, summary: 'Kinship established through nursing and honorable conduct toward women.' },
  { id: 18, volume: 3, translitTitle: 'Kitab Al-Talaq', englishTitle: 'Book of Divorce', arabicTitle: 'كتاب الطلاق', urduTitle: 'کتاب الطلاق', totalHadiths: 84, startHadith: 3324, endHadith: 3407, summary: 'Legal guidelines for divorce, waiting period (Iddah), reconciliation, and maintenance.' },
  { id: 19, volume: 3, translitTitle: 'Kitab Al-Lian', englishTitle: 'Book of Mutual Cursing', arabicTitle: 'كتاب اللعان', urduTitle: 'کتاب اللعان', totalHadiths: 26, startHadith: 3408, endHadith: 3433, summary: 'Judicial oath procedure in cases of marital accusation without external witnesses.' },
  { id: 20, volume: 3, translitTitle: 'Kitab Al-Itq', englishTitle: 'Book of Emancipation', arabicTitle: 'كتاب العتق', urduTitle: 'کتاب العتق', totalHadiths: 32, startHadith: 3434, endHadith: 3465, summary: 'Virtues of freeing slaves and treating subordinates with dignity and fairness.' },

  { id: 21, volume: 4, translitTitle: 'Kitab Al-Buyu', englishTitle: 'Book of Business Transactions', arabicTitle: 'كتاب البيوع', urduTitle: 'کتاب البیوع', totalHadiths: 145, startHadith: 3466, endHadith: 3610, summary: 'Honest trade, prohibition of fraud and uncertainty (Gharar), and mutual goodwill in commerce.' },
  { id: 22, volume: 4, translitTitle: 'Kitab Al-Musaqat', englishTitle: 'Book of Sharecropping', arabicTitle: 'كتاب المساقاة', urduTitle: 'کتاب المساقاۃ', totalHadiths: 160, startHadith: 3611, endHadith: 3770, summary: 'Agricultural partnerships, prohibition of usury (Riba), loans, and lawful earnings.' },
  { id: 23, volume: 4, translitTitle: 'Kitab Al-Faraid', englishTitle: 'Book of Inheritance', arabicTitle: 'كتاب الفرائض', urduTitle: 'کتاب الفرائض', totalHadiths: 28, startHadith: 3771, endHadith: 3798, summary: 'Distribution of estates according to Quranic shares and rights of heirs.' },
  { id: 24, volume: 4, translitTitle: 'Kitab Al-Hibah', englishTitle: 'Book of Gifts', arabicTitle: 'كتاب الهبات', urduTitle: 'کتاب الہبات', totalHadiths: 42, startHadith: 3799, endHadith: 3840, summary: 'Etiquette of gifting, fairness among children, and life-tenancy grants.' },
  { id: 25, volume: 4, translitTitle: 'Kitab Al-Wasiyyah', englishTitle: 'Book of Will', arabicTitle: 'كتاب الوصايا', urduTitle: 'کتاب الوصایا', totalHadiths: 32, startHadith: 3841, endHadith: 3872, summary: 'Making bequests up to one-third of an estate, charitable endowments (Waqf), and ongoing charity.' },
  { id: 26, volume: 4, translitTitle: 'Kitab Al-Nazr', englishTitle: 'Book of Vows', arabicTitle: 'كتاب النذر', urduTitle: 'کتاب النذر', totalHadiths: 22, startHadith: 3873, endHadith: 3894, summary: 'Fulfilling lawful vows to Allah and expiation for unfulfilled vows.' },
  { id: 27, volume: 4, translitTitle: 'Kitab Al-Ayman', englishTitle: 'Book of Oaths', arabicTitle: 'كتاب الأيمان', urduTitle: 'کتاب الایمان والاحلاف', totalHadiths: 76, startHadith: 3895, endHadith: 3970, summary: 'Rulings on oaths, breaking an oath for a better course, and caring for servants.' },
  { id: 28, volume: 4, translitTitle: 'Kitab Al-Qasamah', englishTitle: 'Book of Oaths in Murder Cases', arabicTitle: 'كتاب القسامة والمحاربين', urduTitle: 'کتاب القسامہ', totalHadiths: 55, startHadith: 3971, endHadith: 4025, summary: 'Sanctity of human life, legal retribution (Qisas), and blood money (Diyah).' },
  { id: 29, volume: 4, translitTitle: 'Kitab Al-Hudud', englishTitle: 'Book of Prescribed Punishments', arabicTitle: 'كتاب الحدود', urduTitle: 'کتاب الحدود', totalHadiths: 62, startHadith: 4026, endHadith: 4087, summary: 'Judicial standards, averting punishments in cases of doubt, and safeguarding public justice.' },
  { id: 30, volume: 4, translitTitle: 'Kitab Al-Aqdiyah', englishTitle: 'Book of Judgements', arabicTitle: 'كتاب الأقضية', urduTitle: 'کتاب الاقضیہ', totalHadiths: 31, startHadith: 4088, endHadith: 4118, summary: 'Impartial adjudication, burden of proof, and striving for sound legal reasoning (Ijtihad).' },
  { id: 31, volume: 4, translitTitle: 'Kitab Al-Luqatah', englishTitle: 'Book of Lost Property', arabicTitle: 'كتاب اللقطة', urduTitle: 'کتاب اللقطہ', totalHadiths: 27, startHadith: 4119, endHadith: 4145, summary: 'Responsibility toward lost items, public announcement, and hospitality toward guests.' },

  { id: 32, volume: 5, translitTitle: 'Kitab Al-Jihad', englishTitle: 'Book of Jihad', arabicTitle: 'كتاب الجهاد والسير', urduTitle: 'کتاب الجہاد والسیر', totalHadiths: 235, startHadith: 4146, endHadith: 4380, summary: 'Laws of armed defense, treaties, mercy to non-combatants, and Prophetic expeditions.' },
  { id: 33, volume: 5, translitTitle: 'Kitab Al-Imarah', englishTitle: 'Book of Leadership', arabicTitle: 'كتاب الإمارة', urduTitle: 'کتاب الامارۃ', totalHadiths: 265, startHadith: 4381, endHadith: 4645, summary: 'Trust of governance, accountability of rulers, justice, and fulfillment of pledges.' },
  { id: 34, volume: 5, translitTitle: 'Kitab Al-Sayd', englishTitle: 'Book of Hunting', arabicTitle: 'كتاب الصيد والذبائح', urduTitle: 'کتاب الصید والذبائح', totalHadiths: 75, startHadith: 4646, endHadith: 4720, summary: 'Lawful hunting, humane slaughter in Allah’s name, and permissible foods.' },
  { id: 35, volume: 5, translitTitle: 'Kitab Al-Adahi', englishTitle: 'Book of Sacrifice', arabicTitle: 'كتاب الأضاحي', urduTitle: 'کتاب الاضاحی', totalHadiths: 55, startHadith: 4721, endHadith: 4775, summary: 'Ritual sacrifice during Eid al-Adha, criteria for sacrificial animals, and sharing meat.' },
  { id: 36, volume: 5, translitTitle: 'Kitab Al-Ashribah', englishTitle: 'Book of Drinks', arabicTitle: 'كتاب الأشربة', urduTitle: 'کتاب الاشربہ', totalHadiths: 235, startHadith: 4776, endHadith: 5010, summary: 'Prohibition of intoxicants, manners of eating and drinking, and gratitude for sustenance.' },
  { id: 37, volume: 5, translitTitle: 'Kitab Al-Libas', englishTitle: 'Book of Clothing', arabicTitle: 'كتاب اللباس والزينة', urduTitle: 'کتاب اللباس والزینت', totalHadiths: 175, startHadith: 5011, endHadith: 5185, summary: 'Modesty in dress, personal grooming, humility over pride, and permissible adornment.' },
  { id: 38, volume: 5, translitTitle: 'Kitab Al-Adab', englishTitle: 'Book of Manners', arabicTitle: 'كتاب الآداب', urduTitle: 'کتاب الاداب', totalHadiths: 75, startHadith: 5186, endHadith: 5260, summary: 'Naming children honorably, seeking permission before entering homes, and noble etiquette.' },

  { id: 39, volume: 6, translitTitle: 'Kitab Al-Salam', englishTitle: 'Book of Greetings and Peace', arabicTitle: 'كتاب السلام', urduTitle: 'کتاب السلام', totalHadiths: 215, startHadith: 5261, endHadith: 5475, summary: 'Spreading peace (Salam), visiting the ill, Prophetic medicine, and community courtesy.' },
  { id: 40, volume: 6, translitTitle: 'Kitab Al-Alfaz', englishTitle: 'Book of Words', arabicTitle: 'كتاب الألفاظ من الأدب', urduTitle: 'کتاب الالفاظ', totalHadiths: 30, startHadith: 5476, endHadith: 5505, summary: 'Refinement of speech and avoiding expressions incompatible with reverence for Allah.' },
  { id: 41, volume: 6, translitTitle: 'Kitab Al-Shir', englishTitle: 'Book of Poetry', arabicTitle: 'كتاب الشعر', urduTitle: 'کتاب الشعر', totalHadiths: 18, startHadith: 5506, endHadith: 5523, summary: 'Balanced appreciation of wise poetry and speech that elevates truth.' },
  { id: 42, volume: 6, translitTitle: 'Kitab Al-Ruya', englishTitle: 'Book of Dreams', arabicTitle: 'كتاب الرؤيا', urduTitle: 'کتاب الرؤیا', totalHadiths: 42, startHadith: 5524, endHadith: 5565, summary: 'True righteous dreams as a portion of prophecy and etiquette of recounting dreams.' },
  { id: 43, volume: 6, translitTitle: 'Kitab Al-Fadail', englishTitle: 'Book of Virtues', arabicTitle: 'كتاب الفضائل', urduTitle: 'کتاب الفضائل', totalHadiths: 245, startHadith: 5566, endHadith: 5810, summary: 'Noble character, miracles, mercy, and unmatched virtues of Prophet Muhammad (Peace Be Upon Him).' },
  { id: 44, volume: 6, translitTitle: 'Kitab Fadail Al-Sahabah', englishTitle: 'Book of Virtues of Companions', arabicTitle: 'كتاب فضائل الصحابة', urduTitle: 'کتاب فضائل الصحابہ', totalHadiths: 310, startHadith: 5811, endHadith: 6120, summary: 'Merits of Abu Bakr, Umar, Uthman, Ali, the Ahl al-Bayt, Muhajirun, and Ansar.' },
  { id: 45, volume: 6, translitTitle: 'Kitab Al-Birr', englishTitle: 'Book of Kindness and Good Relations', arabicTitle: 'كتاب البر والصلة والآداب', urduTitle: 'کتاب البر والصلہ', totalHadiths: 235, startHadith: 6121, endHadith: 6355, summary: 'Honoring parents, maintaining family ties, anger control, gentleness, and brotherhood.' },

  { id: 46, volume: 7, translitTitle: 'Kitab Al-Qadr', englishTitle: 'Book of Destiny', arabicTitle: 'كتاب القدر', urduTitle: 'کتاب القدر', totalHadiths: 65, startHadith: 6356, endHadith: 6420, summary: 'Divine decree, human responsibility, steadfastness, and seeking beneficial guidance.' },
  { id: 47, volume: 7, translitTitle: 'Kitab Al-Ilm', englishTitle: 'Book of Knowledge', arabicTitle: 'كتاب العلم', urduTitle: 'کتاب العلم', totalHadiths: 45, startHadith: 6421, endHadith: 6465, summary: 'Preservation of authentic knowledge, warning against innovation, and scholarly integrity.' },
  { id: 48, volume: 7, translitTitle: 'Kitab Al-Dhikr', englishTitle: 'Book of Remembrance', arabicTitle: 'كتاب الذكر والدعاء والتوبة والاستغفار', urduTitle: 'کتاب الذکر والدعاء', totalHadiths: 175, startHadith: 6466, endHadith: 6640, summary: 'Remembrance of Allah, comprehensive Prophetic supplications, and seeking forgiveness.' },
  { id: 49, volume: 7, translitTitle: 'Kitab Al-Riqaq', englishTitle: 'Book of Heart Softening', arabicTitle: 'كتاب الرقاق', urduTitle: 'کتاب الرقاق', totalHadiths: 45, startHadith: 6641, endHadith: 6685, summary: 'Detachment from worldly excess, remembrance of mortality, and sincerity of heart.' },
  { id: 50, volume: 7, translitTitle: 'Kitab Al-Tawbah', englishTitle: 'Book of Repentance', arabicTitle: 'كتاب التوبة', urduTitle: 'کتاب التوبہ', totalHadiths: 125, startHadith: 6686, endHadith: 6810, summary: 'Allah’s boundless mercy, joy at a servant’s repentance, and returning after sin.' },
  { id: 51, volume: 7, translitTitle: 'Kitab Sifat Al-Munafiqin', englishTitle: 'Book of Qualities of Hypocrites', arabicTitle: 'كتاب صفات المنافقين وأحكامهم', urduTitle: 'کتاب صفات المنافقین', totalHadiths: 165, startHadith: 6811, endHadith: 6975, summary: 'Traits of hypocrisy to avoid and constancy of sincere worship.' },
  { id: 52, volume: 7, translitTitle: 'Kitab Sifat Al-Qiyamah', englishTitle: 'Book of Description of Day of Judgment', arabicTitle: 'كتاب صفة القيامة والجنة والنار', urduTitle: 'کتاب صفۃ القیامہ', totalHadiths: 145, startHadith: 6976, endHadith: 7120, summary: 'Resurrection, accountability before Allah, intercession, and balance of deeds.' },
  { id: 53, volume: 7, translitTitle: 'Kitab Al-Jannah', englishTitle: 'Book of Paradise', arabicTitle: 'كتاب الجنة وصفة نعيمها وأهلها', urduTitle: 'کتاب الجنہ', totalHadiths: 145, startHadith: 7121, endHadith: 7265, summary: 'Descriptions of Paradise, eternal bliss, its dwellers, and warning of Hellfire.' },
  { id: 54, volume: 7, translitTitle: 'Kitab Al-Fitan', englishTitle: 'Book of Trials and Tribulations', arabicTitle: 'كتاب الفتن وأشراط الساعة', urduTitle: 'کتاب الفتن', totalHadiths: 298, startHadith: 7266, endHadith: 7563, summary: 'Signs of the Final Hour, perseverance during trials, and holding fast to truth.' },
];
