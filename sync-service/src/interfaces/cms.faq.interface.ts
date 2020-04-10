declare namespace ICmsFaqRequest {

    interface ICmsFaq {
        type: string
        action: string
        data: ICmsFaqData[],
    }

    interface ICmsFaqData {
        country: string,
        language: string,
        category: string,
        questionair: [{
            ques: string,
            ans: string
        }]
    }
}
