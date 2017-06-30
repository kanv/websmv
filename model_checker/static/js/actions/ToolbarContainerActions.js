export default function changeActiveTool(toolname) {
	return {
		type: 'CHANGE_ACTIVE_TOOL',
		payload: toolname
	}
}