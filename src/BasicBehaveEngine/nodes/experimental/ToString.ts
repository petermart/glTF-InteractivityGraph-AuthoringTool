import {BehaveEngineNode, IBehaviourNodeProps} from "../../BehaveEngineNode";

export class ToString extends BehaveEngineNode {
    REQUIRED_VALUES = [{id:"a"}]

    constructor(props: IBehaviourNodeProps) {
        super(props);
        this.name = "ToStringNode";
        this.validateValues(this.values);
    }

    override processNode(flowSocket?: string) {
        const {a, b} = this.evaluateAllValues(this.REQUIRED_VALUES.map(val => val.id));
        this.graphEngine.processNodeStarted(this);
        
        const typeIndex = this.getTypeIndex("AMZN_interactivity_string");
        const v = String(a)
        return {id: "value", value: v, type: typeIndex}
    }
}
