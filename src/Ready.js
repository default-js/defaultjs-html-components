class Ready {
	constructor() {
		this.done = new Promise((resolve, reject) => {
			this.resolve = resolve;
			this.reject = reject;
		});
	}
}

export default Ready;
