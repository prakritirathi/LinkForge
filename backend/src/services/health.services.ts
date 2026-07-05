class HealthService {
  getHealth() {
    return {
      status: "OK",
      message: "LinkForge API is running",
    };
  }
}

export default new HealthService();