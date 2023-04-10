
export interface BxFreightStepProp {
  step: number,
}

export function BxFreightStep(props: BxFreightStepProp) {
  return <div>
    <ul className="steps">
      <li data-content="?" className="step step-secondary">Step 1</li>
      <li data-content="!" className="step step-secondary">Step 2</li>
      <li data-content="✓" className="step">Step 3</li>
      <li data-content="✕" className="step">Step 4</li>
      <li data-content="★" className="step">Step 5</li>
    </ul>
  </div>
}