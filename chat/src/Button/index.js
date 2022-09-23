import React from 'react';

import { Button } from './styles';

function Component({ text, ...rest }) {
	return <Button {...rest}>{text}</Button>;
}

export default Component;
