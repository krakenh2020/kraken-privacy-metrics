import { metric1_calculator, metric2_calculator, adv_strength_max, adv_strength_min, scale_grade, score_to_style } from './services/UserPrivacyService';

function equalWithDelta(expected, got, delta) {
  expect(got).toBeGreaterThanOrEqual(expected - delta);
  expect(got).toBeLessThanOrEqual(expected + delta);
}

it('metric1 basic test', () => {
  let ret1 = metric1_calculator(1, 0.4, 0.52);
  equalWithDelta(46, ret1, 3);

  ret1 = metric1_calculator(1, 0.3, 0.52);
  equalWithDelta(41, ret1, 3);

  ret1 = metric1_calculator(1, 0, 0.52);
  equalWithDelta(26, ret1, 3);

  ret1 = metric1_calculator(1, 0.3, 1);
  equalWithDelta(65, ret1, 3);

  ret1 = metric1_calculator(1, 0, 1);
  equalWithDelta(50, ret1, 3);

  ret1 = metric1_calculator(1, 0.3, 0.3);
  equalWithDelta(30, ret1, 3);

  ret1 = metric1_calculator(1, 0.52, 0.52);
  equalWithDelta(52, ret1, 3);

  ret1 = metric1_calculator(1, 0.8, 0.9);
  equalWithDelta(85, ret1, 3);
});

it('metric2 basic test', () => {
  // Test case 1:
  let sim_files = 0;
  let privacy_val = 46;

  let ret2 = metric2_calculator(1, sim_files, privacy_val);
  equalWithDelta(0, ret2, 3);

  // Test case 2:
  sim_files = 1;
  privacy_val = 46;

  ret2 = metric2_calculator(1, sim_files, privacy_val);
  equalWithDelta(0, ret2, 3);

  // Test case 3:

  sim_files = 4;
  privacy_val = 46;

  ret2 = metric2_calculator(100, sim_files, privacy_val);
  equalWithDelta(62, ret2, 3);

  // Test case 4:
  sim_files = 2;
  privacy_val = 46;

  ret2 = metric2_calculator(100, sim_files, privacy_val);
  equalWithDelta(21, ret2, 3);

  // Test case 5:
  sim_files = 3;
  privacy_val = 46;

  ret2 = metric2_calculator(100, sim_files, privacy_val);
  equalWithDelta(44, ret2, 3);

  // Test case 6:
  sim_files = 11;
  privacy_val = 51;

  ret2 = metric2_calculator(100, sim_files, privacy_val);
  equalWithDelta(99, ret2, 3);
});

it('metric1 overall test', () => {
  let input = 4;

  let strength_min = adv_strength_min(input);
  let strength_max = adv_strength_max(input);
  equalWithDelta(0.5, strength_min, 0.1);
  equalWithDelta(0.667, strength_max, 0.1);

  let metric1_res = metric1_calculator(1, strength_min, strength_max);
  equalWithDelta(58, metric1_res, 1);

  let metric1_priv = scale_grade(metric1_res);
  equalWithDelta(3, metric1_priv, 1);

  let style = score_to_style(metric1_priv);
  expect(style.bgcolor).toBe("#fcce00");
  expect(style.completed).toBe(50);
  expect(style.text).toBe("Moderately Low");
});

it('metric2 overall test', () => {
  let metric1_res = 58;
  let sim_files = 0;
  let metric2_res = metric2_calculator(1, sim_files, metric1_res);
  equalWithDelta(0, metric2_res, 1);

  let metric2_priv = scale_grade(metric2_res);
  equalWithDelta(6, metric2_priv, 1);

  let style = score_to_style(metric2_priv);
  expect(style.bgcolor).toBe("#11fc00");
  expect(style.completed).toBe(100);
  expect(style.text).toBe("Very High");
});
