const passwordGen = name => {
    const noName= `GidiGas${Math.floor(Math.random(2) * 11067)}`;
    const userName =`${name}${Math.floor(Math.random(2) * 11067)}`;
    return (name === 'undefined' || undefined ? noName : userName);
}
export default passwordGen;
