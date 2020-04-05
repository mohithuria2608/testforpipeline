declare namespace ICmsFaqRequest {

    interface ICmsFaq {
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
