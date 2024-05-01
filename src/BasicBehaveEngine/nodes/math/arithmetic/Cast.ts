import { abort } from "process";
import {BehaveEngineNode, IBehaviourNodeProps} from "../../../BehaveEngineNode";

export class CastBoolToInt extends BehaveEngineNode {
    REQUIRED_VALUES = [{id:"a"}]

    constructor(props: IBehaviourNodeProps) {
        super(props);
        this.name = "CastBoolToIntNode";
        this.validateValues(this.values);
    }

    override processNode(flowSocket?: string) {
        const {a, b} = this.evaluateAllValues(this.REQUIRED_VALUES.map(val => val.id));
        this.graphEngine.processNodeStarted(this);
        
        const typeIndex = this.getTypeIndex("int");
        const v: number = a ? 1 : 0;

        return {id: "value", value: v, type: typeIndex}
    }
}

export class CastBoolToFloat extends BehaveEngineNode {
    REQUIRED_VALUES = [{id:"a"}]

    constructor(props: IBehaviourNodeProps) {
        super(props);
        this.name = "CastBoolToFloatNode";
        this.validateValues(this.values);
    }

    override processNode(flowSocket?: string) {
        const {a, b} = this.evaluateAllValues(this.REQUIRED_VALUES.map(val => val.id));
        this.graphEngine.processNodeStarted(this);
        
        const typeIndex = this.getTypeIndex("float");
        const v: number = a ? 1 : 0;

        return {id: "value", value: v, type: typeIndex}
    }
}

export class CastIntToBool extends BehaveEngineNode {
    REQUIRED_VALUES = [{id:"a"}]

    constructor(props: IBehaviourNodeProps) {
        super(props);
        this.name = "CastIntToBoolNode";
        this.validateValues(this.values);
    }

    override processNode(flowSocket?: string) {
        const {a, b} = this.evaluateAllValues(this.REQUIRED_VALUES.map(val => val.id));
        this.graphEngine.processNodeStarted(this);
        
        const typeIndex = this.getTypeIndex("bool");
        const v = !!a;

        return {id: "value", value: v, type: typeIndex}
    }
}

export class CastIntToFloat extends BehaveEngineNode {
    REQUIRED_VALUES = [{id:"a"}]

    constructor(props: IBehaviourNodeProps) {
        super(props);
        this.name = "CastIntToFloatNode";
        this.validateValues(this.values);
    }

    override processNode(flowSocket?: string) {
        const {a, b} = this.evaluateAllValues(this.REQUIRED_VALUES.map(val => val.id));
        this.graphEngine.processNodeStarted(this);
        
        const typeIndex = this.getTypeIndex("bool");
        const v = a;

        return {id: "value", value: v, type: typeIndex}
    }
}

export class CastFloatToBool extends BehaveEngineNode {
    REQUIRED_VALUES = [{id:"a"}]

    constructor(props: IBehaviourNodeProps) {
        super(props);
        this.name = "CastFloatToBoolNode";
        this.validateValues(this.values);
    }

    override processNode(flowSocket?: string) {
        const {a, b} = this.evaluateAllValues(this.REQUIRED_VALUES.map(val => val.id));
        this.graphEngine.processNodeStarted(this);
        
        const typeIndex = this.getTypeIndex("int");
        const v = !!a;

        return {id: "value", value: v, type: typeIndex}
    }
}

export class CastFloatToInt extends BehaveEngineNode {
    REQUIRED_VALUES = [{id:"a"}]

    constructor(props: IBehaviourNodeProps) {
        super(props);
        this.name = "CastFloatToIntNode";
        this.validateValues(this.values);
    }

    override processNode(flowSocket?: string) {
        const {a, b} = this.evaluateAllValues(this.REQUIRED_VALUES.map(val => val.id));
        this.graphEngine.processNodeStarted(this);
        
        const typeIndex = this.getTypeIndex("bool");
        const v = Math.trunc(a);

        return {id: "value", value: v, type: typeIndex}
    }
}
