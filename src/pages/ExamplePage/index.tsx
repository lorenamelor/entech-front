import * as React from 'react';

import { ExampleComponent } from '../../components';


class ExamplePage extends React.PureComponent {
	public render() {
		return(
			<div>
				<ExampleComponent />
			</div>
		);
	}
}

export default ExamplePage;