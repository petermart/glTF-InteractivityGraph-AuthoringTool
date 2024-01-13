import {BehaveEngineNode, IBehaviourNodeProps} from "../../../BehaveEngineNode";
import {MatrixHelper} from "./MatrixHelper";

export class Decompose extends BehaveEngineNode {
    REQUIRED_VALUES = [{id:"a"}]

    constructor(props: IBehaviourNodeProps) {
        super(props);
        this.name = "DotNode";
        this.validateValues(this.values);
    }

    override processNode(flowSocket?: string) {
        const {a} = this.evaluateAllValues(this.REQUIRED_VALUES.map(val => val.id));
        this.graphEngine.processNodeStarted(this);
        const typeIndexA = this.values['a'].type!
        const typeA: string = this.getType(typeIndexA);
        //console.log(a);
    
        /*if (typeA !== "float4x4") {
            throw Error("Not input matrix")
        }*/
        let val: any;
        const matrix = a;
        const {translation, rotation, scale} = MatrixHelper.decomposeMatrix(matrix);

        this.outValues.translation = {id: "translation", value: translation, type: this.getTypeIndex('float3')};
        this.outValues.rotation = {id: "rotation", value: rotation, type: this.getTypeIndex('float4')};
        this.outValues.scale = {id: "scale", value: scale, type: this.getTypeIndex('float3')};

        //throw("oops");
        // This is probably not what we want.
        return this.outValues;
        //return {id: "translation", val: translation, type: this.getTypeIndex('float')}
    }
}


