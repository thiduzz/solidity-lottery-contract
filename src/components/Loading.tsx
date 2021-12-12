import './Loading.scss'

export enum LoadingSizes {
  'SMALL' = 'small',
  'MEDIUM' = 'medium',
  'LARGE' = 'large',
  'FULLSCREEN' = 'fullscreen',
}

export enum LoadingTypes {
  'GRADIENT' = 'gradient',
  'PLAIN' = 'plain',
}

interface ILoadingProps {
  type: LoadingTypes
  size: LoadingSizes
  className?: string
}

export const Loading: React.FC<ILoadingProps> = ({ type, size, className }) => (
  <div className={`loading-spinner ${className} ${type} ${size}`}>
    <div className="spinner-container">
      <div className="spinner" />
    </div>
  </div>
)
