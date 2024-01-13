import {BehaveEngineNode, IBehaviourNodeProps} from "../../../BehaveEngineNode";
import {MatrixHelper} from "../matrix/MatrixHelper";

export class Dot extends BehaveEngineNode {
    REQUIRED_VALUES = [{id:"a"}, {id: "b"}]

    constructor(props: IBehaviourNodeProps) {
        super(props);
        this.name = "DotNode";
        this.validateValues(this.values);
    }

    override processNode(flowSocket?: string) {
        const {a, b} = this.evaluateAllValues(this.REQUIRED_VALUES.map(val => val.id));
        this.graphEngine.processNodeStarted(this);
        const typeIndexA = this.values['a'].type!
        const typeIndexB = this.values['b'].type!
        const typeA: string = this.getType(typeIndexA);
        const typeB: string = this.getType(typeIndexB);
        if (typeA !== typeB) {
            throw Error("input types not equivalent")
        }
        let val: any;

        let outType = this.getTypeIndex('float');
        switch (typeA) {
            case "float3":
                val = a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
                break;
            case "float4x4":
                outType = this.getTypeIndex('float4x4');
                val = MatrixHelper.multiplyMatrices(a, b);
                break;
            default:
                throw Error("Invalid type")
        }

        return {id: "val", value: val, type: outType}
    }
}
