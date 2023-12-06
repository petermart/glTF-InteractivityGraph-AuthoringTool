import {BehaveEngineNode, IBehaviourNodeProps} from "../../BehaveEngineNode";

export class WorldPlaySound extends BehaveEngineNode {
    REQUIRED_VALUES = [{id: "sound"}]

    constructor(props: IBehaviourNodeProps) {
        super(props);
        this.name = "WorldPlaySound";
        this.validateValues(this.values);
    }

    override processNode(flowSocket?: string): void {
        const {sound} = this.evaluateAllValues(this.REQUIRED_VALUES.map(val => val.id));
        if (sound < 0) {
            throw Error(`Sound must refer to a gltf audio emitter`);
        }

        this.graphEngine.processNodeStarted(this);

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        
        /*this.graphEngine.startAnimation(animation, startTime, endTime, speed, () => {
            if (this.flows.done) {
                this.addEventToWorkQueue(this.flows.done);
            }
        });*/

        if (this.flows.out) {
            this.processFlow(this.flows.out);
        }
    }
}
