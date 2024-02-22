import {BehaveEngineNode, IBehaviourNodeProps} from "../../../BehaveEngineNode";

export class MakeVector3 extends BehaveEngineNode {
    REQUIRED_VALUES = [{id: "x"}, {id: "y"}, {id: "z"}]

    constructor(props: IBehaviourNodeProps) {
        super(props);
        this.name = "MakeVector3";
        this.validateValues(this.values);
    }

    override processNode(flowSocket?: string) {
        const {x, y, z} = this.evaluateAllValues(this.REQUIRED_VALUES.map(val => val.id));
        this.graphEngine.processNodeStarted(this);
        let val: any;
        //console.log(x);
        //console.log(y);
        //console.log(z);

        this.outValues.result = {id: "result", value: [x, y, z], type: this.getTypeIndex('float3')};

        return null;
    }
}


