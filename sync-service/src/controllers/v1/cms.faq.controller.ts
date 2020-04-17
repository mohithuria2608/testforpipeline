import * as Constant from '../../constant'
import { consolelog, generateFaqId } from '../../utils'
import * as ENTITY from '../../entity'
import { Aerospike } from '../../aerospike'

export class CmsFaqController {

    constructor() { }

    /**
     * @method POST
     * @param {any} payload
     * @description creates faq from CMS to aerospike
     */
    async postFaq(payload: ICmsFaqRequest.ICmsFaq) {
        try {
            let a = {
                "type": "faq_data",
                "action": "reset",
                "data": [
                    {
                        "country": "AE",
                        "language": "En",
                        "category": "FAQs",
                        "questionair": [{
                            "ques": "How will I know when the restaurant received my Order?",
                            "ans": "Once you submit your order, the Order Confirmation page will show the time your order was received along with an estimated time that your order will be ready for carryout or delivery. You will also receive a confirmation email at the email address you provided at registration. And if you're still unsure about your order, you can always call the restaurant directly."
                        },
                        {
                            "ques": "What payment options are available through Mobile Application Ordering?",
                            "ans": "You can choose to pay online using your credit card or cash on delivery."
                        },
                        {
                            "ques": "Can I save my credit card information for future purchases?",
                            "ans": "No. For security purposes, all your credit card information are handled through a secured bank gateway and are never saved on the KFC application."
                        },
                        {
                            "ques": "Where can I change my account info?",
                            "ans": "Once you've signed in to the application with your phone number , Click on Your name from the top hamburger menu. You can change your account information there."
                        },
                        {
                            "ques": "Are delivery charges higher for customers who order from KFC application?",
                            "ans": "No. The transportation fee is always the same online as it is offline for the restaurant taking and delivering your order. There is no difference."
                        },
                        {
                            "ques": "How can I tell how much I’m being charged for delivery service?",
                            "ans": "The transtportation fee is listed at checkout in the itemized portion of the cart summary."
                        },
                        {
                            "ques": "Is there a set minimum amount for most delivery orders?",
                            "ans": "For delivery orders placed online or by phone there is a minimum order amount of Dhs. 24 “transportation fee applies”"
                        },
                        {
                            "ques": "How can I give feedback to KFC about my restaurant experience?",
                            "ans": "KFC wants to ensure that you have a terrific experience in our restaurants and in our mobile application. If you would like to provide feedback, From the Side menu, click on \"Call Support\""
                        }]
                    },
                    {
                        "country": "AE",
                        "language": "Ar",
                        "category": "الأسئلة المتداولة",
                        "questionair": [{
                            "ques": "كيف سأعرف متى تم استلام طلبي من المطعم؟",
                            "ans": "بمجرد تقديم طلبك، ستُظهر صفحة تأكيد طلب الشراء، الوقت الذي استلم فيه المطعم طلبك، إلى جانب الوقت المتوقع لتحضير أو تسليم طلبك. كما أنك ستستلم رسالة تأكيد طلب الشراء على عنوان البريد الإلكتروني الذي قمت بذكره عند التسجيل. وفي حال كنت غير متأكد من الطلب الذي قمت بتقديمه، بإمكانك دائماً الاتصال بالمطعم مباشرةً."
                        },
                        {
                            "ques": "ما هي خيارات الدفع المتاحة عند طلب الشراء من خلال التطبيق؟",
                            "ans": "يمكنك الدفع إلكترونياً باستخدام بطاقة الائتمانية أوالدفع نقداً عند استلام الطلب."
                        },
                        {
                            "ques": "هل بإمكاني حفظ معلومات بطاقتي الائتمانية من أجل طلبات الشراء في المستقبل؟",
                            "ans": "لا. للحفاظ على خصوصيتك، يتم التعامل مع جميع معلومات بطاقة الائتمان الخاصة بك من خلال بوابة البنك المضمونة و لا يتم حفظ أي معلومة على تطبيق دجاج كنتاكي."
                        },
                        {
                            "ques": "أين بإمكاني تغيير معلومات حسابي؟",
                            "ans": "حالما تقوم بتسجيل الدخول إلى التطبيق باستخدام رقم الجوال الخاص بك، اضغط على \"حسابي\" من القائمة العلوية، حيث بإمكانك تغيير معلومات حسابك من هناك."
                        },
                        {
                            "ques": "هل رسوم التوصيل عند استخدام التطبيق أعلى من رسوم التوصيل المعتادة؟",
                            "ans": "كلا، رسوم التوصيل موحدة بالنسبة للمطعم الذي يستلم الطلب ويوصله إليك، لا يوجد أي فرق بالرسوم."
                        },
                        {
                            "ques": "كيف بإمكاني معرفة رسوم خدمة التوصيل التي سأدفعها؟",
                            "ans": "رسوم التوصيل مدرجة بالتفصيل في قسم ملخص الطلب."
                        },
                        {
                            "ques": "هل هناك حد أدنى لمبلغ طلب الشراء بالنسبة لمعظم طلبات التوصيل؟",
                            "ans": "هناك حد أدنى لمبلغ طلبات الشراء عبر الإنترنت أو بواسطة الهاتف بالنسبة لطلبات التوصيل، وهو 24 درهم. بالإضافة الي رسم التوصيل"
                        },
                        {
                            "ques": "كيف بإمكاني تقديم ملاحظاتي حول تجربتي في مطعم \"دجاج كنتاكي\"؟",
                            "ans": "يسعى مطعم \"دجاج كنتاكي\" دائماً لضمان حصولك على تجربة تناول طعام رائعة ومتميزة في سلسلة فروعه وأثناء استخدامك لتطبيق الجوال. إذا كنت ترغب في إبداء أية ملاحظات حول تجربتك معنا، أدخل إلى القائمة الجانبية للتطبيق ، واضغط على \"الاتصال بالدعم\"."
                        }]
                    }
                ]
            }
            payload.data.map(async faq => {
                if (faq.country == "AE")
                    faq.country = "UAE"
                faq['id'] = generateFaqId(faq.language, faq.country)
                let putArg: IAerospike.Put = {
                    bins: faq,
                    set: ENTITY.FaqE.set,
                    key: faq['id'],
                    createOrReplace: true,
                }
                await Aerospike.put(putArg)
            })
            return {}
        } catch (error) {
            consolelog(process.cwd(), "postFaq", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    /**
     * @method GRPC
     * @param {string} country
     * @param {number} language
     * @description Get faq from as 
     */
    async getFaq(payload: IFaqRequest.IFetchFaq) {
        try {
            let faq = await ENTITY.FaqE.getFaq(payload)
            return faq
        } catch (error) {
            consolelog(process.cwd(), "getFaq", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }
}

export const cmsFaqController = new CmsFaqController();