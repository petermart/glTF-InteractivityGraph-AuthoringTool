import {BehaveEngineNode, IBehaviourNodeProps} from "../../../BehaveEngineNode";

export class MakeVector4 extends BehaveEngineNode {
    REQUIRED_VALUES = [{id:"w"}, {id: "x"}, {id: "y"}, {id: "z"}]

    constructor(props: IBehaviourNodeProps) {
        super(props);
        this.name = "MakeVector4";
        this.validateValues(this.values);
    }

    override processNode(flowSocket?: string) {
        const {w, x, y, z} = this.evaluateAllValues(this.REQUIRED_VALUES.map(val => val.id));
        this.graphEngine.processNodeStarted(this);
        let val: any;
        //console.log(w);
        //console.log(x);
        //console.log(y);
        //console.log(z);

        this.outValues.result = {id: "result", value: [w, x, y, z], type: this.getTypeIndex('float4')};

        return null;
    }
}


