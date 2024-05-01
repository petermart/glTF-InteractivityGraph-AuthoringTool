import {BehaveEngineNode, IBehaviourNodeProps} from "../../../BehaveEngineNode";
import {MatrixHelper} from "../matrix/MatrixHelper";

export class MatMul extends BehaveEngineNode {
    REQUIRED_VALUES = [{id:"a"}, {id: "b"}]

    constructor(props: IBehaviourNodeProps) {
        super(props);
        this.name = "MatMulNode";
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

        const outType = this.getTypeIndex('float4x4');
        switch (typeA) {
            case "float4x4":
                val = MatrixHelper.multiplyMatrices(a, b);
                break;
            default:
                throw Error("Invalid type")
        }

        return {id: "value", value: val, type: outType}
    }
}
