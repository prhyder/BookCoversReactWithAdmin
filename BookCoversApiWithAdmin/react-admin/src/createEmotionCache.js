import createCache from '@emotion/cache';

// Ensures the CSS style injection order is correct between Emotion and MUI.
// See more here: https://mui.com/material-ui/guides/interoperability/
export default function createEmotionCache() {
	return createCache({ key: 'css', prepend: true });
}
