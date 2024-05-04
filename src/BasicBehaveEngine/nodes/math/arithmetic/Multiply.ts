import {BehaveEngineNode, IBehaviourNodeProps} from "../../../BehaveEngineNode";

export class Multiply extends BehaveEngineNode {
    REQUIRED_VALUES = [{id:"a"}, {id: "b"}]

    constructor(props: IBehaviourNodeProps) {
        super(props);
        this.name = "MultiplyNode";
        this.validateValues(this.values);
    }

    override processNode(flowSocket?: string) {
        const {a, b} = this.evaluateAllValues(this.REQUIRED_VALUES.map(val => val.id));
        this.graphEngine.processNodeStarted(this);
        const typeIndexA = this.values['a'].type!
        const typeA: string = this.getType(typeIndexA);
        const typeIndexB = this.values['b'].type!
        const typeB: string = this.getType(typeIndexB);
        let val: any;

        let type = typeIndexA;
        if (typeA !== typeB) {
            if (typeA == 'float' && typeB == 'float3') {
                val = [
                    a * b[0],
                    a * b[1],
                    a * b[2],
                ]
                type = typeIndexB;
            } else if (typeA == 'float3' && typeB == 'float') {
                val = [
                    a[0] * b,
                    a[1] * b,
                    a[2] * b,
                ]
            }
        } else {
            switch (typeA) {
            case "int":
            case "float":
                    val = a * b;
                    break;
                case "float3":
                    val = [
                        a[0] * b[0],
                        a[1] * b[1],
                        a[2] * b[2],
                    ]
                    break;
                default:
                    throw Error("Invalid type")
            }    
        }

        return {id: "value", value: val, type: type}
    }
}
