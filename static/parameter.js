window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
  
    if (urlParams.has('url')) {
        document.getElementById('uv-address').value = urlParams.get('url');
        document.getElementById('uv-form').submit();
    }
};
