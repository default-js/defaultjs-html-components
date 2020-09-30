import { define } from "../../utils/DefineComponentHelper";
import NODENAME from "./Nodename";

class View extends Component {
	static get NODENAME() {
		return NODENAME;
	}

	constructor() {
		super();
	}
}
define(View);
export default View;
