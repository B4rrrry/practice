import cls from './Preloader.module.scss';

const Preloader = () => {
  return <div data-testid='preloader-page' className={cls.loader}></div>;
};
export default Preloader;
