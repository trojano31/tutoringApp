const defaulState = {
  subjectId: ''
}

export const advertReducer = (state = defaulState, { type, payload }) => {
  switch (type) {
    case 'set-subject-id':
      return { ...state, subjectId: payload };
    default:
      return state;
  }
}