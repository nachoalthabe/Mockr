var suiRemoteManager = Class.extend({
  /**
   * Tag: {
		pageId: 'mainPage',
		widgetId: 'postsLink',
		tagName: 'Link',
		tagSet: 'Nav'
		paramValues: ['PostList']
	}
   **/
  /**
   * Callback = function(result) {
   * el objeto result tiene dos properties: ok (bool, true si salio bien o false si dio error) y message, con un mensaje de error si corresponde
   */
  processParams: function(params){
    if (!tags instanceof 'Array'){
      return [tags]
    }
    return tags
  },
  applyTags: function(tags, callback){
    tags = this.processParams(tags)
  },
  removeTags: function(tags, callback){
    tags = this.processParams(tags)
  }
})


