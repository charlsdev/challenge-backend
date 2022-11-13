const schedule = [
   {
      'desiredCourse': 'PortfolioConstruction',
      'requiredCourse': 'PortfolioTheories'
   }, {
      'desiredCourse': 'InvestmentManagement',
      'requiredCourse': 'Investment'
   }, {
      'desiredCourse': 'Investment',
      'requiredCourse': 'Finance'
   }, {
      'desiredCourse': 'PortfolioTheories',
      'requiredCourse': 'Investment'
   }, {
      'desiredCourse': 'InvestmentStyle',
      'requiredCourse': 'InvestmentManagement'
   }
]

const orderSchedule = [
   {
      'asig': 'Finance'
   }, {
      'asig': 'Investment'
   }, {
      'asig': 'PortfolioTheories'
   }, {
      'asig': 'InvestmentManagement'
   }, {
      'asig': 'InvestmentStyle'
   }, {
      'asig': 'PortfolioConstruction'
   }
]

module.exports = { schedule, orderSchedule }