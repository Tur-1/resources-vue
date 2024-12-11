 
class Resource
{
   
   pluralLabel = 'Resources';
 
   singleLabel = 'Resource'; 
  
   currentPage = null; 
  /**
   * The title for the resource
   * @type {string}
   */
  constructor()
  {
    
  }
 
  table() {
    
  }
 
  form(route) {
    
  }
  pages() {
    return []
  }
  setCurrentPage(currentPage)
  {
    this.currentPage = currentPage;
  }

  getCurrentPage()
  {
   return this.currentPage;
  }

  getRoutes()
  {
    return this.pages().map(page => page.getPageRoute())
  }
}

export default Resource;
