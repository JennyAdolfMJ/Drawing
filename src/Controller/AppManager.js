class AppManager 
{
  static get Operation()
  {
    return {
      None: "",
      Wall: "wall",
      Furniture: "furniture"
    }
  }

  constructor()
  {
    this.instance = null;
    this.toolbar = null;
    this.operation = AppManager.Operation.None;
  }

  static GetInstance()
  {
    if (!this.instance) {
        this.instance = new AppManager();
    }
    return this.instance;
  }
}

export default AppManager