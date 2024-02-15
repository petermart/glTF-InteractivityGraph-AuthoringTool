import {BehaveEngineNode, IBehaviourNodeProps} from "../../BehaveEngineNode";

export class OnTickNode extends BehaveEngineNode {

    constructor(props: IBehaviourNodeProps) {
        super(props);
        this.name = "OnTick";
        this.outValues.timeSinceLastTick = 0 
        this.outValues.timeSinceStart = 0
    }

    public setTickOutParams(sinceTick:number, sinceStart:number) {
        this.outValues.timeSinceLastTick = {id: "timeSinceLastTick", value: sinceTick, type: this.getTypeIndex("float")};
        this.outValues.timeSinceStart = {id: "timeSinceStart", value: sinceStart, type: this.getTypeIndex("float")};
    }

    override processNode(flowSocket?: string) {
        this.graphEngine.processNodeStarted(this);
        return super.processNode(flowSocket);
    }
}
