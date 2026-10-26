// Shared by the initial merge response and subsequent status polling.
export const UNREADABLE_PHOTO_MESSAGE = 'We could not read one or both of your photographs. This may be due to an unsupported file format or a problem with the files.';

export const getPhotoProcessingError = (status, body, acceptAnyQualityError = false) => {
  if ((status === 400 || status === 422) && body?.code === 'INVALID_IMAGES') {
    return {
      kind: 'unreadable',
      message: UNREADABLE_PHOTO_MESSAGE,
      requiresNewPhotographs: true
    };
  }

  const requiresNewPhotographs = status === 422 && (
    acceptAnyQualityError || ['FACE_QUALITY_ERROR', 'FACE_OCCLUSION_ERROR'].includes(body?.code)
  );
  const checkUnavailable = status === 503 && body?.code === 'FACE_OCCLUSION_CHECK_UNAVAILABLE';
  if (requiresNewPhotographs || checkUnavailable) {
    return {
      kind: 'quality',
      message: body?.error || '',
      requiresNewPhotographs
    };
  }
  return null;
};
