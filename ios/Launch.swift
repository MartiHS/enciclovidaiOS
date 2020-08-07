//
//  Launch.swift
//  Enciclovida
//
//  Created by Marti Hernandez on 02/04/20.
//  Copyright © 2020 Facebook. All rights reserved.
//

import UIKit

class Launch: UIViewController {
  
  override func viewDidLoad() {
    super.viewDidLoad()
    self.view.backgroundColor = UIColor.red
    
    let number = Int.random(in: 0 ..< 11)
    let imageBackG = "Background-\(number)"
    print(imageBackG)
  }
  


}
