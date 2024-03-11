import {BehaveEngineNode, IBehaviourNodeProps} from "../../../BehaveEngineNode";

export class MakeVector4 extends BehaveEngineNode {
    REQUIRED_VALUES = [{id:"x"}, {id: "y"}, {id: "z"}, {id: "w"}]

    constructor(props: IBehaviourNodeProps) {
        super(props);
        this.name = "MakeVector4";
        this.validateValues(this.values);
    }

    override processNode(flowSocket?: string) {
        const {x, y, z, w} = this.evaluateAllValues(this.REQUIRED_VALUES.map(val => val.id));
        this.graphEngine.processNodeStarted(this);
        let val: any;
        //console.log(w);
        //console.log(x);
        //console.log(y);
        //console.log(z);

        this.outValues.result = {id: "result", value: [x, y, z, w], type: this.getTypeIndex('float4')};

        return null;
    }
}


