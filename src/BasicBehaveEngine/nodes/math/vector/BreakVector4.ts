import {BehaveEngineNode, IBehaviourNodeProps} from "../../../BehaveEngineNode";

export class BreakVector4 extends BehaveEngineNode {
    REQUIRED_VALUES = [{id:"a"}]

    constructor(props: IBehaviourNodeProps) {
        super(props);
        this.name = "BreakVector4";
        this.validateValues(this.values);
    }

    override processNode(flowSocket?: string) {
        const {a} = this.evaluateAllValues(this.REQUIRED_VALUES.map(val => val.id));
        this.graphEngine.processNodeStarted(this);
        let val: any;
        //console.log(a);
        const x = a[0];
        const y = a[1];
        const z = a[2];
        const w = a[3];

        this.outValues.x = {id: "x", value: x, type: this.getTypeIndex('float')};
        this.outValues.y = {id: "y", value: y, type: this.getTypeIndex('float')};
        this.outValues.z = {id: "z", value: z, type: this.getTypeIndex('float')};
        this.outValues.w = {id: "w", value: w, type: this.getTypeIndex('float')};

        return null;
    }
}


