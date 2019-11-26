import { BaseConsumer } from "./base.consumer";
import { consolelog } from "../../utils"

enum KAFKA_PRODUCERS {
    AUTH = 'AUTH'
}

class EntityConsumer extends BaseConsumer {

    constructor() {
        super(KAFKA_PRODUCERS.AUTH, 'client');
    }

    handleMessage() {
        this.onMessage<any>().subscribe(
            (message: any) => {
                this.function1(message);
                this.function2(message);
            })
    }

    private async function1(message: any) {
        try {

            consolelog(`Action 1`, [], true);
        } catch (err) {
            consolelog(`Action 1 Error`, [], false);
        }
    }

    private async  function2(message: any) {
        try {

            consolelog(`Action 2`, [], true);
        } catch (err) {
            consolelog(`Action 2 Error`, [], false);
        }
    }
}


export const entityConsumerE = new EntityConsumer();