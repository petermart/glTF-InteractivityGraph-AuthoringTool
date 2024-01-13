import {BehaveEngineNode, IBehaviourNodeProps} from "../../../BehaveEngineNode";
import {MatrixHelper} from "./MatrixHelper";

export class Compose extends BehaveEngineNode {
    REQUIRED_VALUES = [{id:"translation"}, {id: "rotation"}, {id:"scale"}]

    constructor(props: IBehaviourNodeProps) {
        super(props);
        this.name = "CrossNode";
        this.validateValues(this.values);
    }

    override processNode(flowSocket?: string) {
        const {translation, rotation, scale} = this.evaluateAllValues(this.REQUIRED_VALUES.map(val => val.id));
        this.graphEngine.processNodeStarted(this);
        const typeIndexTranslation = this.values['translation'].type!
        const typeTranslation: string = this.getType(typeIndexTranslation);
        const typeIndexRotation = this.values['rotation'].type!
        const typeRotation: string = this.getType(typeIndexRotation);
        const typeIndexScale = this.values['scale'].type!
        const typeScale: string = this.getType(typeIndexScale);

        if (typeTranslation != "float3" || typeRotation != "float4" || typeScale != "float3") {
            console.log(typeTranslation);
            console.log(typeRotation);
            console.log(typeScale);
            throw Error("Wrong input type type")
        }
        let val: any;

        const transformMatrix = MatrixHelper.composeMatrix(translation,rotation,scale);
        return {id: "val", value: transformMatrix, type: this.getTypeIndex("float4x4")};
    }
}
